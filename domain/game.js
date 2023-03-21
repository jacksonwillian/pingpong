// const width = window.innerWidth; 
// const height = window.innerHeight; 

const canvas = document.getElementById("myCanvas");

canvas.width  = 200;
canvas.height = 350;

var ctx = canvas.getContext("2d");

ctx.fillStyle = "#fff";

const ball          = new Ball(100, 175);
const movimentBall  = new Moviment('up', 'right', 1);

const playerBat     = new Bat(74, 334);
const computerBat   = new Bat(74, 10);

const allObjects    = [ball, playerBat, computerBat];


function moveBall(ball, movimentBall) {
    ball.y = movimentBall.vertical === 'up'? --ball.y: ++ball.y;
    ball.x = movimentBall.horizontal === 'right'? ++ball.x : --ball.x;
}

setInterval(() => {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    this.moveBall(ball, movimentBall);

    allObjects.forEach(object => {

        ctx.fillRect(
            object.x, 
            object.y, 
            object.width, 
            object.height
        );

    });

}, 10);