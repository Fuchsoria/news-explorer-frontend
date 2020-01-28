import BaseComponent from './BaseComponent';

export default class Form extends BaseComponent {
  constructor(...args) {
    super(...args);
    this.handlers = this.handlers.bind(this);
  }

  _setServerError() {}

  _validateInputElement() {}

  _validateForm() {}

  _setButtonDisabled() {

  }

  _setButtonActive() {

  }

  _clear() {}

  _getInfo() {}

  _sendSigninRequest(event) {
    event.preventDefault();
    console.log('Отправляю на логин');
  }


  _sendSignupRequest(event) {
    event.preventDefault();
    console.log('Отправляю на регистрацию');
  }


  _sendSearchRequest(event) {
    event.preventDefault();
    console.log('Отправляю на поиск новостей');
  }

  handlers() {
    console.log(this._props.formName);
    if (this._props.formName === 'signinForm') {
      console.log(this._domElement);
      this._mount({ element: this._blockElements.form, handlers: [this._sendSigninRequest], event: 'submit' });
    } else if (this._props.formName === 'signupForm') {
      this._mount({ element: this._blockElements.form, handlers: [this._sendSignupRequest], event: 'submit' });
    } else if (this._props.formName === 'searchForm') {
      this._mount({ element: this._blockElements.form, handlers: [this._sendSearchRequest], event: 'submit' });
    }
  }
}
