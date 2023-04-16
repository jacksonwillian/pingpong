class CanvasView {

    constructor(parentElement, idCanvas) {
        this._parentElement = parentElement;
        this._idCanvas      = idCanvas;
    }

    _template() {
        return `
        <canvas id="${this._idCanvas}">
            Your browser does not support the HTML canvas tag.
        </canvas>`;
    }

    update() {
        this._parentElement.innerHTML = this._template();
    }

}