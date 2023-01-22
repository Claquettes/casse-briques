
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

var ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speedX: 1.5,
    speedY: 1.5,
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
var durability = 2 ; //il faudrait que la durabilité soit liée à la couleur de la brique

for (var r = 0; r < rows; r++) {
    for (var c = 0; c < columns; c++) {
        bricks.push({

            x: c * (brickWidth + 10) + 10,
            y: r * (brickHeight + 10) + 50,
            width: brickWidth,
            height: brickHeight,
            color: "orange",
            visible: true,
            //on ajoute juste ici la durabilité
            durability: durability
            
        });
    }
}

//fin de la génération des briques
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

function checkPaddleCollision() {
    if (ball.y + ball.radius > paddle.y &&
        ball.x > paddle.x &&
        ball.x < paddle.x + paddle.width) {
        ball.speedY = -ball.speedY;
        var paddleCenter = paddle.x + paddle.width / 2;
        var ballDistFromPaddleCenter = ball.x - paddleCenter;
        ball.speedX = ballDistFromPaddleCenter * 0.35;
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

function checkBrickCollision() { //on check la collision avec les briques
    for (var i = 0; i < bricks.length; i++) {
        if ((ball.x > bricks[i].x) && (ball.x < bricks[i].x + bricks[i].width )&& (ball.y > bricks[i].y )&& (ball.y < bricks[i].y + bricks[i].height)) {
            ball.speedY = -ball.speedY;
            bricks.splice(i, 1);
            console.log(ball.speedX, ball.speedY);

        }
    }
}

var maxSpeed = 2;

function updateBallPosition() {
    ball.x += ball.speedX/30;
    ball.y += ball.speedY/30;
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

function paddleControl() {
    document.addEventListener("keydown", function(event) {
        if (event.keyCode === 37) {
            paddle.x -= 1;
        }
        else if (event.keyCode === 39) {
            paddle.x += 1;
        }
    });
}


function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateBallPosition();
    checkPaddleCollision();
    checkBordersCollision();
    checkBrickCollision();
    checkGameOver();

    renderBall();
    renderPaddle();
    renderBricks();
    //on envoie 5 fois par seconde la 
    requestAnimationFrame(draw);
}

function gameloop() {
    setInterval(game, 500)
    setInterval(paddleControl, 100)
}

function game (){
    draw();
    
    
}

// a remplacer a terme, quand il y aura un bouton start, car on ne voudras pas que la séquence de jeu démarre dès le chargement de la page
gameloop();
