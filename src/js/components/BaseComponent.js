export default class BaseComponent {
  constructor(domElement, handlers) {
    this._domElement = domElement;
    this._handlers = handlers;
    this._mounts = [];
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

  _mount(element, handlers) {
    console.log('Загружаю компонент');
    this._setHandlers(element, handlers);
    this._mounts.push({ element, handlers });
    console.log('Обновленный компонент', this._mounts);
  }

  _unmount() {
    console.log('Выгружаю компонент', this._mounts);
    this._mounts.forEach((item) => {
      this._removeHandlers(item.element, item.handlers);
    });
  }
}
