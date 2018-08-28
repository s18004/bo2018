const canvas = document.getElementById("main");
const ctx = canvas.getContext("2d");
const WINDOW_WIDTH = canvas.width;
const WINDOW_HEIGHT = canvas.height;
const SPF = 1000 / 60;
const PADDLE_SPEED = 10;
const BLOCK_WIDTH = 20;
const BLOCK_HEIGHT = 20;

const input = new Input();
const ball = new Ball(400, 300, 10, 'red');
const paddle = new Paddle(400, 550, 100, 10, 'deepskyblue');
const blocks0 = [];
var score = 0;
var Max_score = 100

for (var y = 60; y < 240; y = y + 60) {
    for (var x = 60; x < 760; x = x + 60) {
        blocks0.push(new Block(x, y, BLOCK_WIDTH, BLOCK_HEIGHT, "lime"))
    }
}

ctx.beginPath();
ctx.rect(700,0,100,600);
ctx.fillStyle = "white";
ctx.fill();


window.setInterval(game_tick, SPF);

function game_tick() {
    // 入力状況に応じた呼び出し
    if (input.space) {
        ball.start(5);
    }
    if (input.left) {
        paddle.move(-PADDLE_SPEED);
    }
    if (input.right) {
        paddle.move(PADDLE_SPEED);
    }


    // ボールの移動
    ball.move();

    // ボールとブロックの当たり判定
    paddle.collide(ball);
    // ボールとブロックの当たり判定
    blocks_collide();

    // 各種オブジェクトの描画
    ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    paddle.draw(ctx);
    ball.draw(ctx);
    blocks0.forEach((block) => block.draw(ctx));
    print_score();
    game_clear();
    game_over();
}

function blocks_collide() {
    for (var v = 0; v <  blocks0.length ; v++) {
        if (blocks0[v] && blocks0[v].collide(ball)) {
            score += 100;
            blocks0.splice(v, 1);
        }
    }
}

function game_over() {
    if (ball.y > WINDOW_HEIGHT) {
        ctx.save();
        ctx.font = "64px serif";
        ctx.textAlign = 'center';
        ctx.fillStyle = '#f00';
        ctx.strokeStyle = '#000';
        ctx.fillText('GAME OVER', WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2);
        ctx.strokeText('GAME OVER', WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2);
        ctx.restore();

        ball.vx = 0;
        ball.vy = 0;
    }
}

function game_clear() {
    // スコア〜点に達するとクリア
    if (score >= 1000) {
        ctx.save();
        ctx.font = "64px serif";
        ctx.textAlign = "center";
        ctx.fillStyle = "#00f";
        ctx.strokeStyle = "#fff";
        ctx.fillText("GAME CLEAR", WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2);
        ctx.strokeText("GAME CLEAR", WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2);
        ctx.restore();
    }
}

function print_score() {
    ctx.save();
    ctx.font = "30px serif";
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.fillText("score: " + score, WINDOW_WIDTH - 24, 24);
    ctx.restore();
}