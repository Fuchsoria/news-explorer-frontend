export default class BaseComponent {
  constructor(domElement, handlers) {
    this._domElement = domElement;
    this._handlers = handlers;

    this._setHandlers = this._setHandlers.bind(this);
    this._removeHandlers = this._removeHandlers.bind(this);
  }

  _setHandlers(currentElement, handlers) {
    handlers.forEach((handler) => {
      this._domElement.querySelector(currentElement).addEventListener('click', handler);
    });
  }

  _removeHandlers(currentElement, handlers) {
    handlers.forEach((handler) => {
      this._domElement.querySelector(currentElement).removeEventListener('click', handler);
    });
  }
}
