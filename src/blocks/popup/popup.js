import './popup.css';
import BaseComponent from '../../js/components/BaseComponent';

export default class Popup extends BaseComponent {
  constructor(...args) {
    super(...args);

    this._template = document.querySelector(this._blockElements.templateName);
    this._container = this._blockElements.container;
    this._closeElement = this._blockElements.closeElement;
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.clearContent = this.clearContent.bind(this);
    this._checkUserEvents = this._checkUserEvents.bind(this);
  }

  _createPopup() {
    const clone = this._template.cloneNode(true).content;

    return clone;
  }

  clearContent() {
    this._unmount();
    this._clearNodeContent(this._domElement.querySelector(this._container));
  }

  open() {
    this._domElement.classList.add('popup_opened');
    this.setContent();
  }

  close() {
    this._domElement.classList.remove('popup_opened');
    this.clearContent();
  }

  /**
   * Closes a popup when pressing the escape button or clicking on the overlay
   * @param  {event} event - Button or click event
   */
  _checkUserEvents(event) {
    if (event.target.classList.contains('popup_overlay') || event.key === 'Escape') {
      this.close();
    }
  }

  /**
   * Initializing a popup, creates and adds standard handlers
   */
  _initPopup() {
    this._domElement.querySelector(this._container).appendChild(this._createPopup());
    this._mountLocalHandlers([{ element: this._closeElement, handlers: [this.close] },
      { element: document, handlers: [this._checkUserEvents], event: 'keydown' },
      { element: this._domElement, handlers: [this._checkUserEvents], event: 'mousedown' }]);
  }
}
