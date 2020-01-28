export default class BaseComponent {
  constructor(domElement) {
    this._domElement = domElement;
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

  // Подгрузка обработчиков в единый массив внутри компонента
  _mount({ element, handlers }) {
    this._setHandlers(element, handlers);
    this._mounts.push({ element, handlers });
  }

  _mountLocalHandlers(array) {
    array.forEach((item) => {
      this._mount(item);
    });
  }

  _mountHandlers() {
    console.log('Загружаю компоненты');
    this._handlers.forEach((item) => {
      this._mount(item);
    });
    console.log('Обновленные компоненты', this._mounts);
  }

  setMountHandlers(array) {
    this._handlers = array;
  }

  // Выгрузка всех хандлеров компонента
  _unmount() {
    if (this._mounts.length > 0) {
      this._mounts.forEach((item) => {
        this._removeHandlers(item.element, item.handlers);
      });
      this._mounts = [];
      console.log('Выгрузил компонент', this._mounts);
    }
  }
}
