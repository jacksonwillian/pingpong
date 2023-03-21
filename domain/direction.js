class UniDirection {

    /**
    * @param  direction
    * @param  speed 0
    */

    constructor(direction, speed) {
        this.direction = direction;
        this.speed = speed;
    }
}

class MultiDirection {

    /**
    * @param  vertical 'up' | 'down' 
    * @param  horizontal 'right' | 'left'
    * @param  speed 0
    */

    constructor(vertical, horizontal, speed) {
        this.vertical = vertical;
        this.horizontal = horizontal;
        this.speed = speed;
    }
}