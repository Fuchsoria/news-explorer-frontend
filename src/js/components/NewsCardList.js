import BaseComponent from './BaseComponent';

export default class NewsCardList extends BaseComponent {
  constructor(...args) {
    super(...args);
    this.renderLoader = this.renderLoader.bind(this);
    this.renderError = this.renderError.bind(this);
    this.renderNotFound = this.renderNotFound.bind(this);
    this.clearMarkup = this.clearMarkup.bind(this);
    this._showMore = this._showMore.bind(this);
    this._bookmarkHandler = this._bookmarkHandler.bind(this);

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

  _addCardServerId(cardId, cardServerId) {
    this._alreadyRendered[cardId].serverId = cardServerId;
    this._alreadyRendered[cardId].markup.setAttribute('data-saved', true);
  }

  _removeCardServerId(cardId) {
    this._alreadyRendered[cardId].markup.removeAttribute('data-saved');
    delete this._alreadyRendered[cardId].serverId;
  }

  clearMarkup() {
    this._domElement.innerHTML = '';
  }

  _renderMarkup(template) {
    this._removeBookmarkHandlers();
    this.clearMarkup();

    const markup = template.cloneNode(true).content;

    this._domElement.appendChild(markup);
  }

  _renderResultsMarkup() {
    let template;

    if (this._type === 'saved' && this._blockElements.savedResultsTemplate) {
      const { savedResultsTemplate } = this._blockElements;

      template = savedResultsTemplate;
    } else {
      const { resultsTemplate } = this._blockElements;

      template = resultsTemplate;
    }

    this._renderMarkup(template);
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

  _renderCards(articles) {
    if (this._dependecies.formatNewsDate && this._dependecies.NewsCard
      && this._dependecies.NEWS_CARD_ELEMENTS) {
      const {
        newsChunks, formatNewsDate, NewsCard, NEWS_CARD_ELEMENTS, auth,
      } = this._dependecies;
      const currentChunk = articles || newsChunks.getOneChunk().items;

      if (currentChunk.isLastChunk) {
        this._removeShowMoreButton();
      }

      currentChunk.forEach((item) => {
        const dataId = this._getNewId();
        let cardProps;

        if (this._type === 'saved') {
          const {
            _id, keyword, title, text, image, date, source, link,
          } = item;

          cardProps = {
            isLogged: true,
            type: this._type,
            dataId,
            serverId: _id,
            keyword,
            source,
            link,
            title,
            description: text,
            urlToImage: image,
            publishedAt: date,
            formatedDate: formatNewsDate(date),
          };
        } else {
          const {
            title, description, urlToImage, publishedAt, source, url,
          } = item;

          cardProps = {
            isLogged: auth.getUserAuthStatus(),
            type: 'main',
            dataId,
            keyword: this._keyword,
            source: source.name,
            link: url,
            title,
            description,
            urlToImage,
            publishedAt,
            formatedDate: formatNewsDate(publishedAt),
          };
        }

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
    this._removeBookmarkHandlers();
    this._renderCards();

    if (this._isLogged) {
      this._addBookmarkHandlers();
    }
  }

  _sendAddCardRequest(cardId) {
    if (this._dependecies.mainApi) {
      const { createArticle } = this._dependecies.mainApi;
      const { instance } = this._alreadyRendered[cardId];
      const props = instance.getCardProps();

      createArticle(props)
        .then((res) => {
          console.log(res);

          if (!res.id) {
            throw new Error('500');
          }

          return res.id;
        })
        .then((serverId) => this._addCardServerId(cardId, serverId))
        .then(() => instance.setBookmarkMarked())
        .catch((err) => console.log(err));
    }
  }

  _sendRemoveCardRequest(cardId) {
    if (this._dependecies.mainApi) {
      const { removeArticle } = this._dependecies.mainApi;
      const { instance } = this._alreadyRendered[cardId];
      const serverId = instance.getCardProps().serverId || this._alreadyRendered[cardId].serverId;

      removeArticle(serverId)
        .then((res) => {
          if (!res.id && !res._id) {
            throw new Error('500');
          }
        })
        .then(() => this._removeCardServerId(cardId))
        .then(() => {
          if (this._type === 'saved' && this._dependecies.savedNews) {
            const { savedNews } = this._dependecies;

            instance.deleteCard();
            savedNews.deleteSavedCard(serverId);
          } else {
            instance.removeBookmarkMarked();
          }
        })
        .catch((err) => console.log(err));
    }
  }

  _bookmarkHandler(event) {
    const cardElement = event.target.closest('.card');
    const cardId = cardElement.getAttribute('data-id');
    const isSaved = cardElement.hasAttribute('data-saved');
    const isBookmarkClick = event.target.classList.contains('card__bookmark-icon');

    if (this._type === 'saved' && isBookmarkClick) {
      this._sendRemoveCardRequest(cardId);
    } else if (isSaved && isBookmarkClick) {
      this._sendRemoveCardRequest(cardId);
    } else if (!isSaved && isBookmarkClick) {
      this._sendAddCardRequest(cardId);
    }
  }

  _addBookmarkHandlers() {
    const iterable = Object.values(this._alreadyRendered);

    iterable.forEach((renderedItem) => {
      this._setHandlers(renderedItem.markup, [this._bookmarkHandler], 'click');
    });
  }

  _removeBookmarkHandlers() {
    const iterable = Object.values(this._alreadyRendered);
    const alreadyRenderedCount = iterable.length;

    if (alreadyRenderedCount > 0) {
      iterable.forEach((renderedItem) => {
        this._removeHandlers(renderedItem.markup, [this._bookmarkHandler], 'click');
      });
    }
  }

  initialResults(articles, keyword) {
    if (this._dependecies.newsChunks && this._dependecies.auth) {
      const { newsChunks, auth } = this._dependecies;
      this._isLogged = auth.getUserAuthStatus();
      this._keyword = keyword;

      Promise.resolve()
        .then(() => {
          newsChunks.clearChunks();
          this._removeBookmarkHandlers();
          this._clearAlreadyRendered();
        })
        .then(() => newsChunks.generateChunks(articles))
        .then(() => this._renderResultsMarkup())
        .then(() => this._renderShowMoreButton())
        .then(() => this._renderCards())
        .then(() => {
          if (this._isLogged) {
            this._addBookmarkHandlers();
          }
        })
        .catch((err) => console.log(err));
    }
  }

  initialSavedResults(articles) {
    this._type = 'saved';
    Promise.resolve()
      .then(() => this._renderResultsMarkup())
      .then(() => this._renderCards(articles))
      .then(() => this._addBookmarkHandlers())
      .catch((err) => console.log(err));
  }
}
