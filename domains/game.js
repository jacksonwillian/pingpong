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

class Game {


    constructor(scoreUpdateCallback) {
        if(!scoreUpdateCallback) {
            throw Error('Uninitialized score update callback');
        }
        this._scoreUpdateCallback = scoreUpdateCallback;
        this._requestAnimationFrame = null;
    }


    start(canvas, ctx) {
        this._frame = new Frame(0, 0, canvas.width, canvas.height);
    
        this._playerBat = new Bat(74, (this._frame.height - HEIGHT_BAT - MARGIN_BAT), STOPPED, SPEED+2);
        
        this._computerBat = new Bat(74, (this._frame.y + MARGIN_BAT), STOPPED, SPEED);
        
        this._score = new Score();
        
        this._ball = this._getRandomInitialBall();

        this._game(canvas, ctx);
    }
    

    _getRandomInitialBall() {
        const verticalDirection = 1 * (-1)**Math.floor(Math.random() * 10);
        const horizontalDirection = 1 * (-1)**Math.floor(Math.random() * 10);
        return new Ball(100, 175, verticalDirection, horizontalDirection, SPEED);
    }
    
    
    _moveBall(ball) {
        ball.y = ball.y + (ball.speed * ball.verticalDirection);
        ball.x = ball.x + (ball.speed * ball.horizontalDirection);
    }
    
    _moveBat(frame, bat) {
        const newPosition = bat.x + (bat.speed * bat.horizontalDirection);
        if (!frame.hasCollided({ ...bat, x: newPosition })) {
            bat.x = bat.x + (bat.speed * bat.horizontalDirection);
        }
        bat.horizontalDirection = STOPPED;
    }
    
    _moveComputerBat(frame, ball, computerBat) {
    
        if (ball.y < (frame.height/6) && ball.verticalDirection === UP) {
            if (ball.x >= (computerBat.x + computerBat.width)) {
                computerBat.horizontalDirection = RIGHT;
            } else if (ball.x <= computerBat.x) {
                computerBat.horizontalDirection = LEFT;
            }
            this._moveBat(frame, computerBat);
        }
    }
    
    _game(canvas, ctx) {
    
        const collidedFrame         = this._frame.hasCollided(this._ball);
        const collidedPlayerBat     = this._playerBat.hasCollided(this._ball);
        const collidedComputerBat   = this._computerBat.hasCollided(this._ball);
    
        if (collidedFrame) {
    
            if (collidedFrame === 'up') {
                this._ball = this._getRandomInitialBall();
                this._score.incrementPlayerBat();
                this._scoreUpdateCallback(this._score);
            } else if (collidedFrame === 'down') {
                this._ball = this._getRandomInitialBall();
                this._score.incrementComputerBat();
                this._scoreUpdateCallback(this._score);
            } else {
                this._ball.horizontalDirection = this._ball.horizontalDirection * -1;
            }
        } else if (collidedPlayerBat || collidedComputerBat) {
            this._ball.verticalDirection = this._ball.verticalDirection * -1;
        }
    
        this._moveBall(this._ball);
        this._moveBat(this._frame, this._playerBat);
        this._moveComputerBat(this._frame, this._ball, this._computerBat);
    
        
        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );
    
    
        [this._ball, this._playerBat, this._computerBat].forEach(object => {
    
            ctx.fillRect(
                object.x,
                object.y,
                object.width,
                object.height
            );
    
        });

        let functionWithZeroParams = () => {
            this._game(canvas, ctx);
        }
        
        this._requestAnimationFrame = requestAnimationFrame(functionWithZeroParams);
    }


    movePlayerBat(direction){
        this._playerBat.horizontalDirection = direction;
    }

    stop() {
        if(this._requestAnimationFrame) {
            cancelAnimationFrame(this._requestAnimationFrame);
        }
    }

    


}

