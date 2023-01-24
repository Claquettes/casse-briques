document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

const paddleSpeed = 5; // pixels per second

var ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speedX: 2.5,
    speedY: 2.5,
    color: "blue"
};

var paddle = {
    width: 100,
    height: 10,
    x: (canvas.width - 100) / 2,
    y: canvas.height - 20,
    color: "white"
};

//génération des briques
var rows = 5;
var columns = 13;
var brickWidth = 50;
var brickHeight = 20;
var bricks = [];

for (var r = 0; r < rows; r++) {
    for (var c = 0; c < columns; c++) {
        bricks.push({
            color: "red",
            x: c * (brickWidth + 10) + 10,
            y: r * (brickHeight + 10) + 50,
            width: brickWidth,
            height: brickHeight,
            visible: true,
            durability: Math.floor(Math.random() * 3) + 1,

            color: "green"
            
        });
    }
}

function colorBricks() {
    for (var i = 0; i < bricks.length; i++) {
        if (bricks[i].durability == 1) {
            bricks[i].color = "red";
        }
        if (bricks[i].durability == 2) {
            bricks[i].color = "orange";
        }
        if (bricks[i].durability == 3) {
            bricks[i].color = "yellow";
        }
    }
}
//fin de la génération des briques


var rightPressed = false;
var leftPressed = false;

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    }
    else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    }
    else if (e.keyCode == 37) {
        leftPressed = false;
    }
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
        colorBricks();
    }
}

function checkPaddleCollision() {
    if (ball.y + ball.radius > paddle.y &&
        ball.x > paddle.x &&
        ball.x < paddle.x + paddle.width) {
        ball.speedY = -ball.speedY;
        var paddleCenter = paddle.x + paddle.width / 2;
        var ballDistFromPaddleCenter = ball.x - paddleCenter;
        ball.speedX = ballDistFromPaddleCenter * 0.1;
    }
}

function checkBordersCollision() {
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.speedX = -ball.speedX;
    }
    if (ball.y - ball.radius < 0) {
        ball.speedY = -ball.speedY;
    }
    //on check la collision du pad avec les bords du canvas
    if (paddle.x < 0) {
        paddle.x = 0;
    }
    if (paddle.x + paddle.width > canvas.width) {
        paddle.x = canvas.width - paddle.width;
    }
}

function checkBrickCollision() { //on check la collision avec les briques
    for (var i = 0; i < bricks.length; i++) {
        if ((ball.x > bricks[i].x) && (ball.x < bricks[i].x + bricks[i].width )&& (ball.y > bricks[i].y )&& (ball.y < bricks[i].y + bricks[i].height)) {
            ball.speedY = -ball.speedY;
            //on diminue la durabilité de la brique
            bricks[i].durability -= 1;   
            //si la durabilité est à 0, on la supprime
            if (bricks[i].durability == 0) {
            bricks.splice(i, 1);
            }
        }
    }
}

var maxSpeed = 100;

function updateBallPosition() {
    ball.x += ball.speedX;
    ball.y += ball.speedY;
    if (ball.speedX > maxSpeed) {
        ball.speedX = maxSpeed;
    }
    if (ball.speedX < -maxSpeed) {
        ball.speedX = -maxSpeed;
    }
    if (ball.speedY > maxSpeed) {
        ball.speedY = maxSpeed;
    }
    if (ball.speedY < -maxSpeed) {
        ball.speedY = -maxSpeed;
    }
}

function checkGameOver() {
    if (ball.y - ball.radius > canvas.height) {
        alert("Game Over!");
        // a remplacer par un bouton restart
    }
}

function update(dt) {
    updateBallPosition();
    checkPaddleCollision();
    checkBordersCollision();
    checkBrickCollision();
    checkGameOver();
    updatePad(dt);
}
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderBall();
    renderPaddle();
    renderBricks();
}

function updatePad(dt) {
    dt= dt*100;
    if (rightPressed) {
        paddle.x += paddleSpeed * dt;
    } else if (leftPressed) {
        paddle.x -= paddleSpeed * dt;
    }
}

var lastTime;
var timeStep = 1000/60; // 60fps

function fixedUpdate() {
    var currentTime = Date.now();
    var dt = (currentTime - lastTime) / 1000; // time in seconds
    while (dt > timeStep) {
        update(timeStep); // update the game state
        dt -= timeStep;
    }
    update(dt); // update the game state
    render(); // render the game
    lastTime = currentTime;
    requestAnimationFrame(fixedUpdate);
}

function start() {
    colorBricks();
    lastTime = Date.now();
    requestAnimationFrame(fixedUpdate);
}

start();
