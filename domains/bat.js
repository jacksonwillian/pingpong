class Bat extends Base {
    /**
    * @param  x
    * @param  y
    * @param  horizontalDirection
    * @param  speed
    */
    constructor(x, y, horizontalDirection, speed) {
        super(x, y,  60, 5, 'bat', 0, horizontalDirection, speed);
        this._initialX = x;
    }

    hasCollided(otherBase) {

        if(this.type !== otherBase.type) {
            
            const sameEixoX = (this.x <= otherBase.x + otherBase.width) && otherBase.x  <= (this.x + this.width);
            const sameEixoY = ((otherBase.y + otherBase.height) === this.y && otherBase.verticalDirection === DOWN ) || 
                              (otherBase.y === (this.y + this.height) && otherBase.verticalDirection === UP);

            if(sameEixoY && sameEixoX) {
                return true;
            }

        }   
    }

    initialPosition() {
        this.x = this._initialX;
    }


}