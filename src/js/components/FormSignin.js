import Form from './Form';

export default class FormSignin extends Form {
  constructor(...args) {
    super(...args);

    this.handlers = this.handlers.bind(this);
    this._sendSigninRequest = this._sendSigninRequest.bind(this);
    this._validateSigninForm = this._validateSigninForm.bind(this);
  }

  _validateSigninForm() {
    const form = this._currentFormElement();
    const { email, password } = form;

    const emailResult = this._validateInput('email', email);
    const passwordResult = this._validateInput('password', password);

    if (emailResult && passwordResult) {
      this._setButtonActive();
    } else {
      this._setButtonDisabled();
    }
  }

  _sendSigninRequest(event) {
    event.preventDefault();
    if (this._dependecies.mainApi) {
      const { email, password } = this._getInfo();
      const { mainApi } = this._dependecies;

      this._setButtonDisabled();
      this._setInputsDisabled();

      mainApi.signin({ email, password })
        .then((resp) => {
          if (resp.status === 200) {
            this._setServerError();
            if (this._dependecies.auth && this._dependecies.popupSignin) {
              const { auth, popupSignin } = this._dependecies;

              auth.sendCheckRequest();
              popupSignin.close();
            }
          } else if (resp.status === 401) {
            throw new Error('401');
          } else {
            throw new Error('500');
          }
        })
        .catch((err) => {
          this._setServerError(err.message);
          this._setButtonActive();
          this._setInputsActive();
        });
    }
  }

  handlers() {
    this._unmount();

    this._setButtonDisabled();
    this._mount({ element: this._blockElements.form, handlers: [this._sendSigninRequest], event: 'submit' });
    this._mount({ element: this._blockElements.form, handlers: [this._validateSigninForm], event: 'input' });
  }
}
