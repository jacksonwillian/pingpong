// const width = window.innerWidth; 
// const height = window.innerHeight; 

const HEIGHT_BAT = 5;
const MARGIN_BAT = 5;
const SPEED      = 1;
const STOPPED    = 0;
const UP         = -1;
const DOWN       = 1;
const RIGHT      = 1;
const LEFT       = -1;


function getInitialBall() {
    const verticalDirection = 1 * (-1)**Math.floor(Math.random() * 10);
    const horizontalDirection = 1 * (-1)**Math.floor(Math.random() * 10);
    return new Ball(100, 175, verticalDirection, horizontalDirection, SPEED);
}

const canvas = document.getElementById("myCanvas");

canvas.width = 200;
canvas.height = 300;

var ctx = canvas.getContext("2d");
ctx.fillStyle = "#fff";

const frame = new Frame(0, 0, canvas.width, canvas.height);

const playerBat = new Bat(74, (frame.height - HEIGHT_BAT - MARGIN_BAT), STOPPED, 4);

const computerBat = new Bat(74, (frame.y + MARGIN_BAT), STOPPED, SPEED);

let ball = getInitialBall();


function moveBall(ball) {
    ball.y = ball.y + (ball.speed * ball.verticalDirection);
    ball.x = ball.x + (ball.speed * ball.horizontalDirection);
}

function moveBat(bat) {
    const newPosition = bat.x + (bat.speed * bat.horizontalDirection);
    if (!frame.hasCollided({ ...bat, x: newPosition })) {
        bat.x = bat.x + (bat.speed * bat.horizontalDirection);
    }
    bat.horizontalDirection = STOPPED;
}

function moveComputerBat(frame, ball, computerBat) {

    if (ball.y < (frame.height/6) && ball.verticalDirection === UP) {
        if (ball.x >= (computerBat.x + computerBat.width)) {
            computerBat.horizontalDirection = RIGHT;
        } else if (ball.x <= computerBat.x) {
            computerBat.horizontalDirection = LEFT;
        }
        this.moveBat(computerBat);
    }
}

document.addEventListener("keydown", (event) => {

    if (event.defaultPrevented) {
        return;
    }

    if (event.code === "ArrowLeft") {
        playerBat.horizontalDirection = LEFT;
    } else if (event.code === "ArrowRight") {
        playerBat.horizontalDirection = RIGHT;
    }

});



function game() {

    const collidedFrame = frame.hasCollided(ball);
    const collidedPlayerBat = playerBat.hasCollided(ball);
    const collidedComputerBat = computerBat.hasCollided(ball);

    if (collidedFrame) {

        if (collidedFrame === 'up') {
            ball = getInitialBall();
        } else if (collidedFrame === 'down') {
            ball = getInitialBall();
        } else {
            ball.horizontalDirection = ball.horizontalDirection * -1;
        }
    }

    if (collidedPlayerBat || collidedComputerBat) {
        ball.verticalDirection = ball.verticalDirection * -1;
    }

    this.moveBall(ball);
    this.moveBat(playerBat);
    this.moveComputerBat(frame, ball, computerBat);

    
    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    [ball, playerBat, computerBat].forEach(object => {

        ctx.fillRect(
            object.x,
            object.y,
            object.width,
            object.height
        );

    });
    
    requestAnimationFrame(game);
}

game();