// const width = window.innerWidth; 
// const height = window.innerHeight; 

const HEIGHT_BAT = 5;
const WIDTH_BAT  = 60;
const MARGIN_BAT = 5;
const SPEED      = 1;
const STOPPED    = 0;
const UP         = -1;
const DOWN       = 1;
const RIGHT      = 1;
const LEFT       = -1;

class Game {

    constructor(scoreUpdateCallback, collidedCallback) {
        if(!scoreUpdateCallback || !collidedCallback) {
            throw Error('Uninitialized callbacks');
        }
        this._scoreUpdateCallback   = scoreUpdateCallback;
        this._collidedCallback      = collidedCallback;
        this._requestAnimationFrame = null;
        this._started               = false;
    }


    start(canvas, ctx) {

        this._started = true;

        this._frame = new Frame(0, 0, canvas.width, canvas.height);
    
        this._playerBat = new Bat((this._frame.width/2) - (WIDTH_BAT/2), (this._frame.height - HEIGHT_BAT - MARGIN_BAT), STOPPED, SPEED);
        
        this._computerBat = new Bat(74, (this._frame.y + MARGIN_BAT), STOPPED, SPEED);
        
        this._score = new Score();

        this._scoreUpdateCallback(this._score);
        
        this._ball = this._getRandomInitialBall();

        this._game(canvas, ctx);
    }
    

    _getRandomInitialBall() {
        const verticalDirection = 1 * (-1)**Math.floor(Math.random() * 10);
        const horizontalDirection = 1 * (-1)**Math.floor(Math.random() * 10);
        return new Ball(100, this._frame.height/2, verticalDirection, horizontalDirection, SPEED);
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
    }
    
    _moveComputerBat(frame, ball, computerBat) {
    
        if (ball.y < (frame.height/3.5) && ball.verticalDirection === UP) {
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
                this._playerBat.initialPosition();
                this._computerBat.initialPosition();
            } else if (collidedFrame === 'down') {
                this._ball = this._getRandomInitialBall();
                this._score.incrementComputerBat();
                this._scoreUpdateCallback(this._score);
                this._playerBat.initialPosition();
                this._computerBat.initialPosition();
            } else {
                this._ball.horizontalDirection = this._ball.horizontalDirection * -1;
            }
            this._collidedCallback('frame');
        } else if (collidedPlayerBat || collidedComputerBat) {
            this._collidedCallback('bat')
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
        if(this._started) {
            this._playerBat.horizontalDirection = direction;
        }
    }

    stop() {
        this._started = false;
        if(this._requestAnimationFrame) {
            cancelAnimationFrame(this._requestAnimationFrame);
        }
    }

    


}

