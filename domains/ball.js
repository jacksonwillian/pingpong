class Ball extends Base {
    /**
    * @param  x
    * @param  y
    * @param  verticalDirection
    * @param  horizontalDirection
    * @param  speed
    */
    constructor(x, y, verticalDirection, horizontalDirection, speed) {
        super(x, y, 5, 5, 'ball', verticalDirection, horizontalDirection, speed);
    }
    
}