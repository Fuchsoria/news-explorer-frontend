import Popup from '../popup';

export default class PopupSignup extends Popup {
  constructor(...args) {
    super(...args);

    this.setContent = this.setContent.bind(this);
    this._linkToSignin = this._linkToSignin.bind(this);
  }

  _linkToSignin() {
    this.clearContent();
    this._dependecies.popupSignin.setContent();
  }

  setContent() {
    this._initPopup();

    if (this._dependecies.popupSignin) {
      this._mount({ element: '.popup__link', handlers: [this._linkToSignin] });
    }

    if (this._dependecies.formSignup) {
      this._dependecies.formSignup.handlers();
    }
  }
}
