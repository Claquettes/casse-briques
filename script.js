document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
//VARIABLES
var rightPressed = false;
var leftPressed = false;
const paddleSpeed = 5; // pixels per second
var lastTime;
var timeStep = 1000/60; // 60fps
var maxSpeed = 200;

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

var bricks = [];

/*génération des briques
var rows = 5;
var columns = 13;
var brickWidth = 50;
var brickHeight = 20;


for (var r = 0; r < rows; r++) {
    for (var c = 0; c < columns; c++) {
            bricks.push({
                color: "red",
                x: c * (brickWidth + 10) + 10,
                y: r * (brickHeight + 10) + 50,
                width: brickWidth,
                height: brickHeight,
                visible: true,
                durability: Math.floor(Math.random() * 3) + 1
            });
    }
}
*/

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
    checkURLParams();
    colorBricks();
    lastTime = Date.now();
    requestAnimationFrame(fixedUpdate);
}

var hide = localStorage.getItem('currChoice') || 0;
if (hide == 1){
document.getElementById('floatingBox').style.display = "none";
localStorage.clear();
}

function gbpClick(){
var currChoice = 1;
localStorage.setItem('currChoice', currChoice);
location.href='/?level=1';
}

function usdClick(){
var currChoice = 1;
localStorage.setItem('currChoice', currChoice);
location.href='/?level=1';
}


function checkURLParams() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var level = url.searchParams.get("level");
    if (level == 1) {
        bricks = Level1();
    }
    if (level == 2) {
        bricks = Level2();
    }
}

start();

