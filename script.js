
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

var ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speedX: 5,
    speedY: 5,
    color: "blue"
};


var paddle = {
    width: 100,
    height: 10,
    x: (canvas.width - 100) / 2,
    y: canvas.height - 20,
    color: "black"
};

var bricks = [];
for (var i = 0; i < 5; i++) {
    bricks.push({
        width: 50,
        height: 20,
        x: i * 60 + 10,
        y: 50,
        color: "orange"
    });
}


function renderBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    ctx.fillStyle = ball.color;
    ctx.fill();
}


function renderPaddle() {
    ctx.fillStyle = paddle.color;
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// Render the bricks on the canvas
function renderBricks() {
    for (var i = 0; i < bricks.length; i++) {
        ctx.fillStyle = bricks[i].color;
        ctx.fillRect(bricks[i].x, bricks[i].y, bricks[i].width, bricks[i].height);
    }
}

document.addEventListener("keydown", function(event) {
    if (event.keyCode === 37) {
        paddle.x -= 10;
    }
    else if (event.keyCode === 39) {
        paddle.x += 10;
    }
});

function checkPaddleCollision() {
    if ((ball.y + ball.radius > paddle.y) && (ball.x > paddle.x) && (ball.x < paddle.x + paddle.width)) {
        ball.speedX = -ball.speedX;
        ball.speedY = -ball.speedY;
    }
}

function checkBordersCollision() {
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.speedX = -ball.speedX;
    }
    if (ball.y - ball.radius < 0) {
        ball.speedY = -ball.speedY;
    }
}


function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.x += parseInt(ball.speedX / 12);
    ball.y += ball.speedY / 10;
    checkPaddleCollision();
    checkBordersCollision();

    renderBall();
    renderPaddle();
    renderBricks();
    requestAnimationFrame(draw);
}

function gameloop() {
    setInterval(game, 100)
}

function game (){
    draw();
    
}

// a remplacer a terme, quand il y aura un bouton start
gameloop();
