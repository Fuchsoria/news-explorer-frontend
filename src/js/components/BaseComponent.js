export default class BaseComponent {
  constructor(domElement, blockElements, props) {
    this._domElement = domElement;
    this._blockElements = blockElements;
    this._props = props;
    this._mounts = [];
  }

  // Массовое добавление обработчиков определенному элементу
  _setHandlers(currentElement, handlers, event) {
    const element = typeof currentElement === 'object'
      ? currentElement : this._domElement.querySelector(currentElement);

    handlers.forEach((handler) => {
      element.addEventListener(event, handler);
    });
  }

  // Удаление добавление обработчиков определенному элементу
  _removeHandlers(currentElement, handlers, event) {
    const element = typeof currentElement === 'object'
      ? currentElement : this._domElement.querySelector(currentElement);

    handlers.forEach((handler) => {
      element.removeEventListener(event, handler);
    });
  }

  // Подгрузка обработчиков в единый массив внутри компонента
  _mount({ element, handlers, event = 'click' }) {
    this._setHandlers(element, handlers, event);
    this._mounts.push({ element, handlers, event });
  }

  // Подгрузка локальных обработчиков
  _mountLocalHandlers(array) {
    array.forEach((item) => {
      this._mount(item);
    });
  }

  // Подгрузка внешних обработчиков
  _mountHandlers() {
    if (this._handlers) {
      console.log('Подгрузчик обработчиков', this._handlers);
      console.log('Загружаю компоненты');
      this._handlers.forEach((item) => {
        this._mount(item);
      });
      console.log('Обновленные компоненты', this._mounts);
    }
  }

  // Установка внешних обработчиков
  setMountHandlers(array) {
    this._handlers = array;
  }

  // Добавляем зависимости уже после инициализации
  setDependecies(dependecies) {
    this._dependecies = dependecies;
  }

  // Выгрузка всех обработчиков компонента
  _unmount() {
    if (this._mounts.length > 0) {
      console.log(this._mounts);
      this._mounts.forEach((item) => {
        this._removeHandlers(item.element, item.handlers, item.event);
      });
      this._mounts = [];
      console.log('Выгрузил компоненты', this._mounts);
    }
  }
}
