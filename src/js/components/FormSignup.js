import Form from './Form';

export default class FormSignup extends Form {
  constructor(...args) {
    super(...args);

    this.handlers = this.handlers.bind(this);
    this._sendSignupRequest = this._sendSignupRequest.bind(this);
    this._validateSignupForm = this._validateSignupForm.bind(this);
  }

  _validateSignupForm() {
    const form = this._currentFormElement();
    const { email, password, name } = form;

    const emailResult = this._validateInput('email', email);
    const passwordResult = this._validateInput('password', password);
    const nameResult = this._validateInput('name', name);

    if (emailResult && passwordResult && nameResult) {
      this._setButtonActive();
    } else {
      this._setButtonDisabled();
    }
  }

  _sendSignupRequest(event) {
    event.preventDefault();

    if (this._dependecies.mainApi) {
      const { email, password, name } = this._getInfo();
      const { mainApi } = this._dependecies;

      this._setButtonDisabled();
      this._setInputsDisabled();

      mainApi.signup({ email, password, name })
        .then((resp) => {
          if (resp.status === 201) {
            if (this._dependecies.popupRegistered && this._dependecies.popupSignup) {
              this._dependecies.popupSignup.clearContent();
              this._dependecies.popupRegistered.setContent();
            }
          } else if (resp.status === 409) {
            throw new Error('409');
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
    this._mount({ element: this._blockElements.form, handlers: [this._validateSignupForm], event: 'input' });
    this._mount({ element: this._blockElements.form, handlers: [this._sendSignupRequest], event: 'submit' });
  }
}
