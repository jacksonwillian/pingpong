// const width = window.innerWidth; 
// const height = window.innerHeight; 

const canvas = document.getElementById("myCanvas");

canvas.width  = 200;
canvas.height = 350;

var ctx = canvas.getContext("2d");

ctx.fillStyle = "#fff";

const ball          = new Ball(104, 16);
const playerBat     = new Bat(75, 334);
const computerBat   = new Bat(75, 10);
const allObjects    = [ball, playerBat, computerBat];


setInterval(() => {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    allObjects.forEach(object => {
        ctx.fillRect(
            object.x, 
            object.y, 
            object.width, 
            object.height
        );
    });

}, 1000);