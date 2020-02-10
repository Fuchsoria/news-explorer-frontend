export default class BaseComponent {
  constructor(domElement, blockElements, props) {
    this._domElement = domElement;
    this._blockElements = blockElements;
    this._props = props;
    this._mounts = [];
  }

  /**
   * очищает у ноды всех потомков
   * @param  {node} node - нода
   */
  _clearNodeContent(node) {
    while (node.lastChild) {
      node.removeChild(node.lastChild);
    }
  }

  /**
   * Добавляет на определенный элемент необходимые слушатели событий
   * @param  {node} currentElement - нода либо текстовый селектор
   * @param  {array} handlers - массив обработчиков
   * @param  {string} event - событие строкой
   */
  _setHandlers(currentElement, handlers, event) {
    const element = typeof currentElement === 'object'
      ? currentElement : this._domElement.querySelector(currentElement);

    handlers.forEach((handler) => {
      element.addEventListener(event, handler);
    });
  }

  /**
   * Удаляет события с определенного элемента
   * @param  {node} currentElement - нода либо текстовый селектор
   * @param  {array} handlers - массив обработчиков
   * @param  {string} event - событие строкой
   */
  _removeHandlers(currentElement, handlers, event) {
    const element = typeof currentElement === 'object'
      ? currentElement : this._domElement.querySelector(currentElement);

    handlers.forEach((handler) => {
      element.removeEventListener(event, handler);
    });
  }

  /**
   * Вызывает метод добавления события и записывает их внутрь компонента
   * @param  {node} element - нода либо текстовый селектор
   * @param  {array} handlers - массив обработчиков
   * @param  {string} event - событие либо устанавливает стандартное значение клик
   */
  _mount({ element, handlers, event = 'click' }) {
    this._setHandlers(element, handlers, event);
    this._mounts.push({ element, handlers, event });
  }

  /**
   * массово добавляет локальные обработчики на один или несколько элементов
   * @param  {array} array - массив объектов необходимых для метода _mount
   */
  _mountLocalHandlers(array) {
    array.forEach((item) => {
      this._mount(item);
    });
  }

  /**
   * Подгрузка внешних обработчиков, указанных ранее через метод setMountHandlers
   */
  _mountHandlers() {
    if (this._handlers) {
      this._handlers.forEach((item) => {
        this._mount(item);
      });
    }
  }

  /**
   * Задаёт список обработчиков внутрь компонента,
   * для дальнейшего использования через метод _mountHandlers
   * @param  {array} array - список объектов необходимых для подгрузки обработчиков
   */
  setMountHandlers(array) {
    this._handlers = array;
  }

  /**
   * Добавляем зависимости уже после инициализации класса компонента,
   * необходимо для решения цикличных зависимостей
   * @param  {object} dependecies - Объект зависимостей, которые будут добавлены внутрь компонента
   */
  setDependecies(dependecies) {
    this._dependecies = dependecies;
  }

  /**
   * Выгрузка всех обработчиков компонента, установленных через _mount либо его родительские методы
   */
  _unmount() {
    if (this._mounts.length > 0) {
      this._mounts.forEach((item) => {
        this._removeHandlers(item.element, item.handlers, item.event);
      });

      this._mounts = [];
    }
  }
}
