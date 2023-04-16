class GameController {

    constructor() {

        this._idScore    = 'score';
        this._idCanvas   = 'frame';
        this._scoreView  = new ScoreView(document.querySelector('#scoreView'), this._idScore);
        this._canvasView = new CanvasView(document.querySelector('#canvasView'), this._idCanvas); 
        this._game       = new Game((score) => {
            console.log(score);
            this._scoreView.update(score.playerBat, score.computerBat);
        });

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

        document.addEventListener("mousemove", (event) => {
            
    
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

    }

    start() {
        this._scoreView.update(0,0);
        this._canvasView.update();

        const canvas = document.getElementById(this._idCanvas);
        canvas.width = 200;
        canvas.height = 300;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#fff";

        this._game.stop();
        this._game.start(canvas, ctx);
    }


    
}