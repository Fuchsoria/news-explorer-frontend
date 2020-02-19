import './results.css';
import BaseComponent from '../../js/components/BaseComponent';

export default class Results extends BaseComponent {
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

  /**
   * Clears saved cards and id from component osprey
   */
  _clearAlreadyRendered() {
    this._alreadyRendered = {};
    this._lastCardId = 0;
  }

  /**
   * Returns a new id to create a card
   */
  _getNewId() {
    const lastId = this._lastCardId;
    this._lastCardId += 1;

    return lastId;
  }

  /**
   * Adds a saved card attribute
   * and adds the server id of the card in the object of already rendered cards
   * @param  {string} cardId - Id card
   * @param  {string} cardServerId - Id card on the server
   */
  _addCardServerId(cardId, cardServerId) {
    this._alreadyRendered[cardId].serverId = cardServerId;
    this._alreadyRendered[cardId].markup.setAttribute('data-saved', true);
  }

  /**
   * Deletes the attribute of the saved card.
   * and removes the server id of the card from the object of already rendered cards
   * @param  {string} cardId - Id card
   */
  _removeCardServerId(cardId) {
    this._alreadyRendered[cardId].markup.removeAttribute('data-saved');
    delete this._alreadyRendered[cardId].serverId;
  }

  clearMarkup() {
    this._clearNodeContent(this._domElement);
  }

  /**
   * Draws template layout in results
   * @param  {template} template - template needed for rendering in the results
   */
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

  /**
   * Adds a card to the page.
   * @param  {node} card - card node
   */
  _addCard(card) {
    const results = this._domElement.querySelector('.results__cards');

    results.appendChild(card);
  }

  /**
  * Starts a cycle on the transferred articles or from takes them from chunks,
   * the cycle will create props depending on the type of cards
   * and saves their initialization and nodes inside the local object,
   * and sends cards to add to the page
   * @param  {array} articles - Articles array
   */
  _renderCards(articles) {
    if (this._dependecies.formatNewsDate
      && this._dependecies.CARD_ELEMENTS && this._dependecies.createCardInstance) {
      const {
        newsChunks, formatNewsDate, createCardInstance, CARD_ELEMENTS, auth,
      } = this._dependecies;
      let currentChunk;

      if (articles) {
        currentChunk = articles;
      } else {
        const chunk = newsChunks.getOneChunk();

        currentChunk = chunk.items;

        if (chunk.isLastChunk) {
          this._removeShowMoreButton();
        }
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

        const newCardInstance = createCardInstance(false, CARD_ELEMENTS, cardProps);
        const newCardMarkup = newCardInstance.getCardMarkup();

        this._addCard(newCardMarkup);

        this._alreadyRendered[dataId] = {
          dataId,
          instance: newCardInstance,
          markup: newCardMarkup,
        };
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

  /**
   * Depending on the type of page and attribute of the card -
   * sends a request to add / remove cards
   * @param  {event} event - Event object
   */
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

  /**
   * Initializes news search results
   * @param  {array} articles
   * @param  {string} keyword
   */
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

  /**
   * Sets the type, initializes the rendering of the markup of results, cards
   * and adds bookmark handlers
   * @param  {array} articles - Array of saved news
   */
  initialSavedResults(articles) {
    this._type = 'saved';
    Promise.resolve()
      .then(() => this._renderResultsMarkup())
      .then(() => this._renderCards(articles))
      .then(() => this._addBookmarkHandlers())
      .catch((err) => console.log(err));
  }
}
