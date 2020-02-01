import BaseComponent from './BaseComponent';

export default class Form extends BaseComponent {
  constructor(...args) {
    super(...args);
    this.handlers = this.handlers.bind(this);
    this._sendSigninRequest = this._sendSigninRequest.bind(this);
    this._sendSignupRequest = this._sendSignupRequest.bind(this);
    this._sendSearchRequest = this._sendSearchRequest.bind(this);
    this._validateSigninForm = this._validateSigninForm.bind(this);
    this._validateSignupForm = this._validateSignupForm.bind(this);
    this._validateSearchForm = this._validateSearchForm.bind(this);
  }

  _setServerError(errorNumber) {
    const errorField = this._domElement.querySelector(this._blockElements.form).querySelector('.form__error_server');

    if (errorNumber === 401 && this._dependecies.FORM_ERRORS_TEXT) {
      errorField.textContent = this._dependecies.FORM_ERRORS_TEXT.wrongEmailOrPassword;
      errorField.classList.add('form__error_server_visible');
    } else if (errorNumber === 409 && this._dependecies.FORM_ERRORS_TEXT) {
      errorField.textContent = this._dependecies.FORM_ERRORS_TEXT.conflict;
      errorField.classList.add('form__error_server_visible');
    } else if (errorNumber === 500 && this._dependecies.FORM_ERRORS_TEXT) {
      errorField.textContent = this._dependecies.FORM_ERRORS_TEXT.serverError;
      errorField.classList.add('form__error_server_visible');
    } else {
      errorField.classList.remove('form__error_server_visible');
      errorField.textContent = '';
    }
  }

  _currentFormElement() {
    return this._domElement.querySelector(this._blockElements.form);
  }

  _setInputError(input, errorText, searchInput) {
    let errorField;

    if (!searchInput) {
      errorField = input.closest('.form__field').querySelector('.form__error');
    } else {
      errorField = this._domElement.querySelector('.form__error');
    }

    if (errorText) {
      errorField.textContent = errorText;
      errorField.classList.add('form__error_visible');
    } else {
      errorField.textContent = '';
      errorField.classList.remove('form__error_visible');
    }
  }

  _validateInput(inputName, input) {
    const { validator, FORM_ERRORS_TEXT } = this._dependecies;
    let validationResult = true;

    if (validator.isEmpty(input.value) && inputName !== 'query') {
      this._setInputError(input, FORM_ERRORS_TEXT.emptyField);
      validationResult = false;
    } else if (inputName === 'email' && !validator.isEmail(input.value)) {
      this._setInputError(input, FORM_ERRORS_TEXT.wrongEmailFormat);
      validationResult = false;
    } else if (validator.isEmpty(input.value) && inputName === 'query') {
      this._setInputError(input, FORM_ERRORS_TEXT.emptyQuery, true);
      validationResult = false;
    } else if (inputName === 'query') {
      this._setInputError(input, false, true);
    } else {
      this._setInputError(input);
    }

    return validationResult;
  }


  _setButtonDisabled(type) {
    if (type === 'search') {
      const button = this._currentFormElement().querySelector('.search__button');

      button.setAttribute('disabled', true);
    } else {
      const button = this._currentFormElement().querySelector('.form__button');

      button.classList.add('form__button_disabled');
      button.setAttribute('disabled', true);
    }
  }

  _setButtonActive(type) {
    if (type === 'search') {
      const button = this._currentFormElement().querySelector('.search__button');

      button.removeAttribute('disabled');
    } else {
      const button = this._currentFormElement().querySelector('.form__button');

      button.classList.remove('form__button_disabled');
      button.removeAttribute('disabled');
    }
  }

  _setInputsDisabled() {
    const formInputs = this._currentFormElement().querySelectorAll('input');

    formInputs.forEach((input) => {
      input.setAttribute('disabled', true);
    });
  }

  _setInputsActive() {
    const formInputs = this._currentFormElement().querySelectorAll('input');

    formInputs.forEach((input) => {
      input.removeAttribute('disabled');
    });
  }

  _getInfo() {
    const form = this._currentFormElement();
    let dataObject;

    if (this._dependecies.xss) {
      const xssFilter = this._dependecies.xss;

      dataObject = {
        searchQuery: form.search ? xssFilter(form.search.value) : 'none',
        email: form.email ? xssFilter(form.email.value) : 'none',
        password: form.password ? xssFilter(form.password.value) : 'none',
        name: form.name ? xssFilter(form.name.value) : 'none',
      };
    } else {
      dataObject = {
        searchQuery: form.search ? form.search.value : 'none',
        email: form.email ? form.email.value : 'none',
        password: form.password ? form.password.value : 'none',
        name: form.name ? form.name.value : 'none',
      };
    }

    return dataObject;
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
      this._setButtonDisabled();
      this._setInputsDisabled();

      const { email, password } = this._getInfo();

      this._dependecies.mainApi.signin({ email, password })
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
          }
        })
        .catch(() => {
          this._setServerError(401);
          this._setButtonActive();
          this._setInputsActive();
        });
    }
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
      this._setButtonDisabled();
      this._setInputsDisabled();

      const { email, password, name } = this._getInfo();

      this._dependecies.mainApi.signup({ email, password, name })
        .then((resp) => {
          if (resp.status === 201) {
            if (this._dependecies.popupRegistered && this._dependecies.popupSignup) {
              this._dependecies.popupSignup.clearContent();
              this._dependecies.popupRegistered.setContent();
            }
          } else if (resp.status === 409) {
            this._setServerError(409);
            this._setButtonActive();
            this._setInputsActive();
          }
        })
        .catch(() => {
          this._setServerError(500);
          this._setButtonActive();
          this._setInputsActive();
        });
    }
  }

  _validateSearchForm() {
    const form = this._currentFormElement();
    const { search } = form;
    const queryResult = this._validateInput('query', search);

    return queryResult;
  }


  _sendSearchRequest(event) {
    event.preventDefault();
    const validateResult = this._validateSearchForm();

    if (validateResult) {
      console.log(this._getInfo());
      // this._setButtonDisabled('search');
      // this._setInputsDisabled();

      console.log('Отправляю на поиск новостей');
    } else {
      console.log('Невалидно');
    }
  }

  handlers() {
    this._unmount();
    if (this._props.formName === 'signinForm') {
      this._setButtonDisabled();
      this._mount({ element: this._blockElements.form, handlers: [this._sendSigninRequest], event: 'submit' });
      this._mount({ element: this._blockElements.form, handlers: [this._validateSigninForm], event: 'input' });
    } else if (this._props.formName === 'signupForm') {
      this._setButtonDisabled();
      this._mount({ element: this._blockElements.form, handlers: [this._validateSignupForm], event: 'input' });
      this._mount({ element: this._blockElements.form, handlers: [this._sendSignupRequest], event: 'submit' });
    } else if (this._props.formName === 'searchForm') {
      this._mount({ element: this._blockElements.form, handlers: [this._validateSearchForm], event: 'input' });
      this._mount({ element: this._blockElements.form, handlers: [this._sendSearchRequest], event: 'submit' });
    }
  }
}
