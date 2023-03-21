class Moviment {

    _VERTICAL = ['up', 'down'];
    _HORIZONTAL = ['right', 'left'];

    /**
    * @param  vertical 'up' | 'down' 
    * @param  horizontal 'right' | 'left'
    * @param  speed 0
    */
    constructor(vertical, horizontal, speed) {

        if (!this._VERTICAL.includes(vertical)) {
            throw new Error('Movimento vertical inválido.')
        }
        if (!this._HORIZONTAL.includes(horizontal)) {
            throw new Error('Movimento horizontal inválido.')
        }
        if(isNaN(speed)) {
            throw new Error('Velocidade é inválida.')
        }

        this.vertical    = vertical;
        this.horizontal  = horizontal;
        this.speed       = speed;
    }
}