import './form.css';
import BaseComponent from '../../js/components/BaseComponent';

export default class Form extends BaseComponent {
  /**
   * If there is an error number, displays it in the form, if not, clears and hides
   * @param  {number} errorNumber - error number
   */
  _setServerError(errorNumber) {
    const errorField = this._domElement.querySelector(this._blockElements.form).querySelector('.form__error_server');
    const checkedErrorNumber = typeof errorNumber === 'number' ? errorNumber : Number(errorNumber);

    if (checkedErrorNumber === 401 && this._dependecies.FORM_ERRORS_TEXT) {
      errorField.textContent = this._dependecies.FORM_ERRORS_TEXT.wrongEmailOrPassword;
      errorField.classList.add('form__error_server_visible');
    } else if (checkedErrorNumber === 409 && this._dependecies.FORM_ERRORS_TEXT) {
      errorField.textContent = this._dependecies.FORM_ERRORS_TEXT.conflict;
      errorField.classList.add('form__error_server_visible');
    } else if (checkedErrorNumber === 500 && this._dependecies.FORM_ERRORS_TEXT) {
      errorField.textContent = this._dependecies.FORM_ERRORS_TEXT.serverError;
      errorField.classList.add('form__error_server_visible');
    } else if (checkedErrorNumber === 12029 && this._dependecies.FORM_ERRORS_TEXT) {
      errorField.textContent = this._dependecies.FORM_ERRORS_TEXT.connectionLost;
      errorField.classList.add('form__error_server_visible');
    } else {
      errorField.classList.remove('form__error_server_visible');
      errorField.textContent = '';
    }
  }

  /**
   * Returns the node of the current form
   */
  _currentFormElement() {
    return this._domElement.querySelector(this._blockElements.form);
  }

  /**
   * Set error on input field
   * @param  {node} input - the node by which the error node will be found
   * @param  {string} errorText - error text
   * @param  {string} searchInput - used as a trigger to recognize the type of form
   */
  _setInputError(input, errorText, queryInput) {
    let errorField;

    if (!queryInput) {
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

  _setButtonDisabled() {
    const button = this._currentFormElement().querySelector('.form__button');

    button.classList.add('form__button_disabled');
    button.setAttribute('disabled', true);
  }

  _setButtonActive() {
    const button = this._currentFormElement().querySelector('.form__button');

    button.classList.remove('form__button_disabled');
    button.removeAttribute('disabled');
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

  /**
   * Returns data from the current form with or without an xss filter
   */
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
}
