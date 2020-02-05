import Popup from './Popup';

export default class PopupSignin extends Popup {
  constructor(...args) {
    super(...args);

    this.setContent = this.setContent.bind(this);
    this._linkToSignup = this._linkToSignup.bind(this);
  }

  _linkToSignup() {
    this.clearContent();
    this._dependecies.popupSignup.setContent();
  }

  setContent() {
    this._initPopup();

    if (this._dependecies.popupSignup) {
      this._mount({ element: '.popup__link', handlers: [this._linkToSignup] });
    }

    if (this._dependecies.signinForm) {
      this._dependecies.signinForm.handlers();
    }
  }
}
