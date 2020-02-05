import Popup from './Popup';

export default class PopupSignup extends Popup {
  constructor(...args) {
    super(...args);

    this.setContent = this.setContent.bind(this);
    this._linkToSignin = this._linkToSignin.bind(this);
    this._linkToRegistered = this._linkToRegistered.bind(this);
  }

  _linkToSignin() {
    this.clearContent();
    this._dependecies.popupSignin.setContent();
  }

  _linkToRegistered() {
    this.clearContent();
    this._dependecies.popupRegistered.setContent();
  }

  setContent() {
    this._initPopup();

    if (this._dependecies.popupSignin) {
      this._mount({ element: '.popup__link', handlers: [this._linkToSignin] });
    }

    if (this._dependecies.signupForm) {
      this._dependecies.signupForm.handlers();
    }
  }
}
