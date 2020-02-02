import BaseComponent from './BaseComponent';

export default class NewsCardList extends BaseComponent {
  constructor(...args) {
    super(...args);
    this.renderLoader = this.renderLoader.bind(this);
    this.renderError = this.renderError.bind(this);
    this.renderNotFound = this.renderNotFound.bind(this);
    this.clearMarkup = this.clearMarkup.bind(this);
    this._showMore = this._showMore.bind(this);

    this._alreadyRendered = {};
    this._lastCardId = 0;
  }

  _clearAlreadyRendered() {
    this._alreadyRendered = {};
    this._lastCardId = 0;
  }

  _getNewId() {
    const lastId = this._lastCardId;
    this._lastCardId += 1;

    return lastId;
  }

  clearMarkup() {
    this._domElement.innerHTML = '';
  }

  _renderMarkup(template) {
    this.clearMarkup();

    const markup = template.cloneNode(true).content;

    this._domElement.appendChild(markup);
  }

  _renderResultsMarkup() {
    const { resultsTemplate } = this._blockElements;

    this._renderMarkup(resultsTemplate);
  }

  renderLoader() {
    const { loadingTemplate } = this._blockElements;

    this._renderMarkup(loadingTemplate);
  }

  renderError() {
    const { resultsErrorTemplate } = this._blockElements;

    this._renderMarkup(resultsErrorTemplate);
  }

  renderNotFound() {
    const { noResultsTemplate } = this._blockElements;

    this._renderMarkup(noResultsTemplate);
  }

  _removeShowMoreButton() {
    this._removeHandlers('.results__more', [this._showMore], 'click');
    this._domElement.querySelector('.results__more').remove();
  }

  _renderShowMoreButton() {
    const { showMoreButtonTemplate } = this._blockElements;
    const buttonMarkup = showMoreButtonTemplate.cloneNode(true).content;

    this._domElement.querySelector('.results__content').appendChild(buttonMarkup);
    this._setHandlers('.results__more', [this._showMore], 'click');
  }

  _addCard(card) {
    const results = this._domElement.querySelector('.results__cards');

    results.appendChild(card);
  }

  _isButtonNeededOnStart() {
    const chunksCount = this._dependecies.newsChunks
      ? this._dependecies.newsChunks.getChunksCount() : 0;

    return chunksCount > 1;
  }

  _renderCards() {
    if (this._dependecies.newsChunks && this._dependecies.formatNewsDate
      && this._dependecies.NewsCard && this._dependecies.NEWS_CARD_ELEMENTS
      && this._dependecies.auth) {
      const {
        newsChunks, formatNewsDate, NewsCard, NEWS_CARD_ELEMENTS, auth,
      } = this._dependecies;
      const currentChunk = newsChunks.getOneChunk();

      if (currentChunk.isLastChunk) {
        this._removeShowMoreButton();
      }

      currentChunk.items.forEach((item) => {
        const dataId = this._getNewId();
        const {
          title, description, urlToImage, publishedAt, source,
        } = item;

        const cardProps = {
          isLogged: auth.getUserAuthStatus(),
          type: 'main',
          dataId,
          keyword: this._keyword,
          source: source.name,
          title,
          description,
          urlToImage,
          publishedAt,
          formatedDate: formatNewsDate(publishedAt),
        };

        const newCardInstance = new NewsCard(false, NEWS_CARD_ELEMENTS, cardProps);
        const newCardMarkup = newCardInstance.getCardMarkup();

        this._addCard(newCardMarkup);

        this._alreadyRendered[dataId] = {
          dataId,
          instance: newCardInstance,
          markup: newCardMarkup,
        };

        console.log(this._alreadyRendered);
      });
    }
  }

  _showMore() {
    this._renderCards();
  }

  initialResults(articles, keyword) {
    if (this._dependecies.newsChunks) {
      const { newsChunks } = this._dependecies;
      this._keyword = keyword;

      Promise.resolve()
        .then(() => {
          newsChunks.clearChunks();
          this._clearAlreadyRendered();
        })
        .then(() => newsChunks.generateChunks(articles))
        .then(() => this._renderResultsMarkup())
        .then(() => this._renderShowMoreButton())
        .then(() => this._renderCards())
        .catch((err) => console.log(err));
    }
  }
}
