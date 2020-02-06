import './search.css';
import Form from '../form/form';

export default class Search extends Form {
  constructor(...args) {
    super(...args);

    this.handlers = this.handlers.bind(this);
    this._sendSearchRequest = this._sendSearchRequest.bind(this);
    this._validateSearchForm = this._validateSearchForm.bind(this);
  }

  _setButtonDisabled() {
    const button = this._currentFormElement().querySelector('.search__button');

    button.setAttribute('disabled', true);
  }

  _setButtonActive() {
    const button = this._currentFormElement().querySelector('.search__button');

    button.removeAttribute('disabled');
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

    if (validateResult && this._dependecies.newsApi && this._dependecies.results) {
      const { newsApi, results } = this._dependecies;
      const { searchQuery } = this._getInfo();

      this._setButtonDisabled();
      this._setInputsDisabled();
      results.renderLoader();

      newsApi.getNews(searchQuery)
        .then((resp) => {
          if (resp.status === 'ok' && resp.articles.length > 0) {
            results.initialResults(resp.articles, searchQuery);
          } else if (resp.status === 'ok' && resp.articles.length <= 0) {
            results.renderNotFound();
          } else {
            throw new Error('500');
          }
        })
        .then(() => {
          this._setButtonActive();
          this._setInputsActive();
        })
        .catch(() => {
          results.renderError();
          this._setButtonActive();
          this._setInputsActive();
        });
    }
  }

  handlers() {
    this._unmount();

    this._mount({ element: this._blockElements.form, handlers: [this._validateSearchForm], event: 'input' });
    this._mount({ element: this._blockElements.form, handlers: [this._sendSearchRequest], event: 'submit' });
  }
}
