class ScoreView {

    constructor(parentElement, idScore) {
        this._parentElement = parentElement;
        this._idScore = idScore;
    }

    _template(playerScore, computerScore) {
        return `
        <div id="${this._idScore}">
                YOU <b>${playerScore} x ${computerScore}</b>  CPU 
        </div>`;
    }

    update(playerScore, computerScore) {
        this._parentElement.innerHTML = this._template(playerScore, computerScore);
    }
}