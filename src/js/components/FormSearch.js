import Form from './Form';

export default class FormSearch extends Form {
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

    if (validateResult && this._dependecies.newsApi && this._dependecies.newsCardList) {
      const { newsApi, newsCardList } = this._dependecies;
      const { searchQuery } = this._getInfo();

      this._setButtonDisabled();
      this._setInputsDisabled();
      newsCardList.renderLoader();

      newsApi.getNews(searchQuery)
        .then((resp) => {
          if (resp.status === 'ok' && resp.articles.length > 0) {
            newsCardList.initialResults(resp.articles, searchQuery);
          } else if (resp.status === 'ok' && resp.articles.length <= 0) {
            newsCardList.renderNotFound();
          } else {
            throw new Error('500');
          }
        })
        .then(() => {
          this._setButtonActive();
          this._setInputsActive();
        })
        .catch(() => {
          newsCardList.renderError();
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
