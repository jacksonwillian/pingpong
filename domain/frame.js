
class Frame extends Base {
    /**
    * @param  x
    * @param  y
    * @param  width
    * @param  height
    */
    constructor(x, y, width, height) {
        super(x, y, width, height, 'frame', 0, 0, 0)
    }

    hasCollided(otherBase) {

        if(this.type !== otherBase.type) {
            
            if(otherBase.x <= this.x) {
                return 'left';
            }
            
            if((otherBase.x + otherBase.width) >= (this.x + this.width)) {
                return 'right';
            }

            if(otherBase.y <= this.y) {
                return 'up';
            }

            if((otherBase.y + otherBase.height) > (this.y + this.height)) {
                return 'down';
            }
            
        }   
    }


}

