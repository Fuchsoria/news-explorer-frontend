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
    this._linkToRegistered = this._linkToRegistered.bind(this);
    this._checkUserEvents = this._checkUserEvents.bind(this);
  }

  _createPopup() {
    const clone = this._template.cloneNode(true).content;

    return clone;
  }

  clearContent() {
    /* innerHTML используется ТОЛЬКО для очистки внутренностей блока */
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

  _linkToRegistered() {
    this.clearContent();
    this._dependecies.popupRegistered.setContent();
  }

  open() {
    this._domElement.classList.add('popup_opened');
    this.setContent();
  }

  close() {
    this._domElement.classList.remove('popup_opened');
    this.clearContent();
  }

  _checkUserEvents(event) {
    if (event.target.classList.contains('popup_overlay') || event.key === 'Escape') {
      this.close();
    }
  }

  setContent() {
    this._domElement.querySelector(this._container).appendChild(this._createPopup());
    this._mountLocalHandlers([{ element: this._closeElement, handlers: [this.close] },
      { element: document, handlers: [this._checkUserEvents], event: 'keydown' },
      { element: this._domElement, handlers: [this._checkUserEvents] }]);

    if (this._props.popupName === 'popupSignup' && this._dependecies.popupSignin) {
      this._mount({ element: '.popup__link', handlers: [this._linkToSignin] });

      if (this._dependecies.signupForm) {
        this._dependecies.signupForm.handlers();
      }
    } else if (this._props.popupName === 'popupSignin' && this._dependecies.popupSignup) {
      this._mount({ element: '.popup__link', handlers: [this._linkToSignup] });

      if (this._dependecies.signinForm) {
        this._dependecies.signinForm.handlers();
      }
    } else if (this._props.popupName === 'popupRegistered' && this._dependecies.popupSignin && this._dependecies.signinForm) {
      this._mount({ element: '.popup__link', handlers: [this._linkToSignin] });
    }
  }
}
