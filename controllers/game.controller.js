class GameController {

    constructor() {

        this._audios = new Map();
        ['ball', 'whistle'].forEach((name)=> {
            const file = `./asserts/${name}.mp3?cb=${new Date().getTime()}`;
            const audio = new Audio(file);
            audio.load();
            this._audios.set(name, audio);
        });

        this._idScore    = 'score';
        this._idCanvas   = 'frame';
        this._scoreView  = new ScoreView(document.querySelector('#scoreView'), this._idScore);
        this._canvasView = new CanvasView(document.querySelector('#canvasView'), this._idCanvas);

        this._game       = new Game(
            (score) => {
                this._audios.get('whistle').play().then(() => {
                    this._scoreView.update(score.playerBat, score.computerBat);
                });
            },
            (collided) => {
                console.log(collided)
                this._audios.get('ball').play();
            }
        );

        this._playerBatInputCommandBind();

    }

    start() {

        this._canvasView.update();

        const canvas = document.getElementById(this._idCanvas);
        canvas.width = 200;
        canvas.height = 300;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#fff";

        this._game.stop();
        this._game.start(canvas, ctx);
    }


    _playerBatInputCommandBind() {
        document.addEventListener("keydown", (event) => {
            if (event.defaultPrevented) {
                return;
            }
            if (event.code === "ArrowLeft") {
                this._game.movePlayerBat(LEFT);
            } else if (event.code === "ArrowRight") {
                this._game.movePlayerBat(RIGHT);
            }
        });

        document.addEventListener("keyup", (event) => {
            if (event.defaultPrevented) {
                return;
            }
            if (event.code === "ArrowLeft" || event.code === "ArrowRight") {
                this._game.movePlayerBat(STOPPED);
            }
        });

        document.addEventListener("mousedown", (event) => {
            if (event.defaultPrevented) {
                return;
            }
            const midpoint = window.innerWidth/2; 
            if (event.clientX < midpoint) {
                this._game.movePlayerBat(LEFT);
            } else if (event.clientX > midpoint) {
                this._game.movePlayerBat(RIGHT);
            }
        });

        document.addEventListener("mouseup", (event) => {
            if (event.defaultPrevented) {
                return;
            }
            this._game.movePlayerBat(STOPPED);
        });

        document.addEventListener("touchstart", (event) => {
            if (event.defaultPrevented) {
                return;
            }
            const midpoint = window.innerWidth/2; 
            let touch = null;
            for(let i = 0; i < event.touches.length; i++) {
                touch =  event.touches[i];
                if (touch.clientX < midpoint) {
                    this._game.movePlayerBat(LEFT);
                } else if (touch.clientX > midpoint) {
                    this._game.movePlayerBat(RIGHT);
                }
            }
        });

        document.addEventListener("touchend", (event) => {
            if (event.defaultPrevented) {
                return;
            }
            this._game.movePlayerBat(STOPPED);
        });

    }


    
}