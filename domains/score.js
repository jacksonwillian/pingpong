class Score {

    constructor() {
        this._playerBat   = 0;
        this._computerBat = 0;
    }

    get playerBat() {
        return this._playerBat ;
    }

    get computerBat() {
        return this._computerBat ;
    }

    incrementPlayerBat() {
        this._playerBat++;
    }

    incrementComputerBat() {
        this._computerBat++;
    }

    reset() {
        this._playerBat   = 0;
        this._computerBat = 0;
    }

}