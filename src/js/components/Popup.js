import BaseComponent from './BaseComponent';

export default class Popup extends BaseComponent {
  constructor(...args) {
    super(...args);

    this._template = document.querySelector(this._blockElements.templateName);
    this._container = this._blockElements.container;
    this._closeElement = this._blockElements.closeElement;
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.clearContent = this.clearContent.bind(this);
    this.setContent = this.setContent.bind(this);
    this._linkToSignin = this._linkToSignin.bind(this);
    this._linkToSignup = this._linkToSignup.bind(this);
  }

  _createPopup() {
    const clone = this._template.cloneNode(true).content;

    return clone;
  }

  clearContent() {
    this._unmount();
    this._domElement.querySelector(this._container).innerHTML = '';
  }

  _linkToSignin() {
    this.clearContent();
    this._dependecies.popupSignin.setContent();
  }

  _linkToSignup() {
    this.clearContent();
    this._dependecies.popupSignup.setContent();
  }

  setContent() {
    this._domElement.querySelector(this._container).appendChild(this._createPopup());
    this._mountLocalHandlers([{ element: this._closeElement, handlers: [this.close] }]);

    if (this._dependecies.popupSignin) {
      this._mount({ element: '.popup__link', handlers: [this._linkToSignin] });
    } else if (this._dependecies.popupSignup) {
      this._mount({ element: '.popup__link', handlers: [this._linkToSignup] });
    }
  }

  open() {
    this._domElement.classList.add('popup_opened');
    this.setContent();
  }

  close() {
    this._domElement.classList.remove('popup_opened');
    this.clearContent();
  }
}
