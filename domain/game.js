// const width = window.innerWidth; 
// const height = window.innerHeight; 

const heightBat = 5;
const marginBat = 5;

const canvas = document.getElementById("myCanvas");

canvas.width = 200;
canvas.height = 300;

var ctx = canvas.getContext("2d");
ctx.fillStyle = "#fff";

const frame = new Base(0, 0, canvas.width, canvas.height, 'frame');

const ball = new Ball(100, 175);
const movimentBall = new MultiDirection('down', 'left', 1);

const playerBat = new Bat(74, (frame.height - heightBat - marginBat));
const movimentPlayerBat = new UniDirection('stopping', 1);

const computerBat = new Bat(74, (frame.y + marginBat));

const objectsToDraw = [ball, playerBat, computerBat];
const objectsToInteraction = [ball, playerBat, computerBat, frame];


function moveBall(ball, movimentBall) {
    ball.y = movimentBall.vertical === 'up' ? --ball.y : ++ball.y;
    ball.x = movimentBall.horizontal === 'right' ? ++ball.x : --ball.x;
}

function moveBat(bat, movimentBat) {
    if(movimentBat.direction && movimentBat.speed) {
        if(movimentBat.direction === 'right') {
            ++bat.x 
            bat.x += movimentBat.speed;
            
        } else if(movimentBat.direction === 'left') {
            --bat.x 
            bat.x -= movimentBat.speed;
        }
        movimentBat.direction = 'stopping';
    }
}

document.addEventListener("keydown", (event) => {

    if (event.defaultPrevented) {
        return;
    }

    if (event.code === "ArrowLeft" && playerBat.hasCollided(frame) !== 'left') {
        movimentPlayerBat.direction = 'left';    
    } else if (event.code === "ArrowRight" && playerBat.hasCollided(frame) !== 'right') {
        movimentPlayerBat.direction = 'right';
    }

});



setInterval(() => {




    objectsToInteraction.forEach(object => {
        const collided = ball.hasCollided(object);
        if (collided) {
            if (ball.y === frame.y) {
                alert('Gol Player');
            } else if (ball.y === frame.height) {
                alert('Gol Computer');
            } else {
                if (collided === 'up') {
                    movimentBall.vertical = 'down';
                } else if (collided === 'down') {
                    movimentBall.vertical = 'up';
                } else if (collided === 'right') {
                    movimentBall.horizontal = 'left';
                } else {
                    movimentBall.horizontal = 'right';
                }
            }
        }

    });

    this.moveBall(ball, movimentBall);
    this.moveBat(playerBat, movimentPlayerBat);


    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
    
    objectsToDraw.forEach(object => {

        ctx.fillRect(
            object.x,
            object.y,
            object.width,
            object.height
        );

    });

}, 20);