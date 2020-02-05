import Popup from './Popup';

export default class PopupRegistered extends Popup {
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
  }
}
