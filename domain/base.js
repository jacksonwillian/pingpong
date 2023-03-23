
class Base {
    /**
    * @param  x
    * @param  y
    * @param  width
    * @param  height
    * @param  type
    */
    constructor(x, y, width, height, type) {
        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.height = height;
        this.type   = type;
    }

    hasCollided(otherBase) {

        if(this.type !== otherBase.type) {
            
            // horizontal verification down
            if(this.x >= otherBase.x && this.x <= (otherBase.x + otherBase.width) && this.y === otherBase.y) {
                return 'down';
            }
            
            // horizontal verification up
            if(this.x >= otherBase.x && this.x <= (otherBase.x + otherBase.width) && this.y === (otherBase.y + otherBase.height)) {
                return 'up';
            }

            // vertical verification right
            if(this.y >= otherBase.y && this.y <= (otherBase.y + otherBase.height) && (this.x + this.width) >= (otherBase.x + otherBase.width)) {
                return 'right';
            }

            // vertical verification left
            if(this.y >= otherBase.y && this.y <= (otherBase.y + otherBase.height) && this.x <= otherBase.x) {
                return 'left';
            }
        }   
    }


}

