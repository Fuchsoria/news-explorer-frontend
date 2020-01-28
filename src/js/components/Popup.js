import BaseComponent from './BaseComponent';

export default class Popup extends BaseComponent {
  constructor({ templateName, container, closeElement },
    _domElement, _mount, _mountLocalHandlers, _mountHandlers, setMountHandlers, _unmount) {
    super(_domElement, _mount, _mountLocalHandlers, _mountHandlers, setMountHandlers, _unmount);

    this._template = document.querySelector(templateName);
    this._container = container;
    this._closeElement = closeElement;
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    console.log('открыл');
    this._domElement.classList.add('popup_opened');
    this._render();
    this._mountLocalHandlers([{ element: this._closeElement, handlers: [this.close] }]);
  }

  close() {
    console.log('закрыл');
    this._domElement.classList.remove('popup_opened');
    this._unmount();
  }

  _createPopup() {
    const clone = this._template.cloneNode(true).content;

    return clone;
  }

  _render() {
    this._unmount();
    // Очищаем popup и рендерим его заного
    this._domElement.querySelector(this._container).innerHTML = '';
    this._domElement.querySelector(this._container).appendChild(this._createPopup());

    this._mountHandlers();
  }
}
