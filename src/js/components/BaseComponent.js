export default class BaseComponent {
  constructor(domElement, blockElements, props) {
    this._domElement = domElement;
    this._blockElements = blockElements;
    this._props = props;
    this._mounts = [];
  }

  /**
   * cleans the nodes of all descendants
   * @param  {node} node - node
   */
  _clearNodeContent(node) {
    while (node.lastChild) {
      node.removeChild(node.lastChild);
    }
  }

  /**
   * Adds necessary event listeners to a specific element
   * @param  {node} currentElement - node or text selector
   * @param  {array} handlers - array of handlers
   * @param  {string} event - event string
   */
  _setHandlers(currentElement, handlers, event) {
    const element = typeof currentElement === 'object'
      ? currentElement : this._domElement.querySelector(currentElement);

    handlers.forEach((handler) => {
      element.addEventListener(event, handler);
    });
  }

  /**
   * Deletes events from a specific item
   * @param  {node} currentElement - node or text selector
   * @param  {array} handlers - array of handlers
   * @param  {string} event - event string
   */
  _removeHandlers(currentElement, handlers, event) {
    const element = typeof currentElement === 'object'
      ? currentElement : this._domElement.querySelector(currentElement);

    handlers.forEach((handler) => {
      element.removeEventListener(event, handler);
    });
  }

  /**
   * Invokes a method to add events and writes them inside a component
   * @param  {node} element - node or text selector
   * @param  {array} handlers - array of handlers
   * @param  {string} event - event either sets the default click value
   */
  _mount({ element, handlers, event = 'click' }) {
    this._setHandlers(element, handlers, event);
    this._mounts.push({ element, handlers, event });
  }

  /**
   * massively adds local handlers to one or more elements
   * @param  {array} array - array of objects necessary for the method _mount
   */
  _mountLocalHandlers(array) {
    array.forEach((item) => {
      this._mount(item);
    });
  }

  /**
   * Loading external handlers previously specified through the setMountHandlers method
   */
  _mountHandlers() {
    if (this._handlers) {
      this._handlers.forEach((item) => {
        this._mount(item);
      });
    }
  }

  /**
   * Defines a list of handlers inside a component,
   * for further use through the method _mountHandlers
   * @param  {array} array - list of objects required for loading handlers
   */
  setMountHandlers(array) {
    this._handlers = array;
  }

  /**
   * Add dependencies after initializing the component class,
   * necessary to solve cyclic dependencies
   * @param  {object} dependecies - Dependency object to be added inside the component
   */
  setDependecies(dependecies) {
    this._dependecies = dependecies;
  }

  /**
   * Unloading all component handlers installed via _mount or its parent methods
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
