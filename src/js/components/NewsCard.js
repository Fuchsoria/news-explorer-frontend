import BaseComponent from './BaseComponent';

export default class NewsCard extends BaseComponent {
  constructor(...args) {
    super(...args);

    this._createCard();
    this.getCardMarkup = this.getCardMarkup.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
  }

  _createDomElement() {
    const { cardTemplate } = this._blockElements;
    this._domElement = cardTemplate.cloneNode(true).content.querySelector('.card');
  }

  _updateDomElementContent() {
    const {
      dataId, keyword, source, title, description, urlToImage, formatedDate,
    } = this._props;
    const {
      cardTitle, cardDate, cardText, cardSource, cardImg, cardKeyword,
    } = this._blockElements;

    this._domElement.setAttribute('data-Id', dataId);
    this._domElement.querySelector(cardTitle).textContent = title;
    this._domElement.querySelector(cardDate).textContent = formatedDate;
    this._domElement.querySelector(cardText).textContent = description;
    this._domElement.querySelector(cardSource).textContent = source;
    this._domElement.querySelector(cardKeyword).textContent = keyword;
    this._domElement.querySelector(cardImg).src = urlToImage;
  }

  _setBookmark() {
    const { isLogged, type } = this._props;
    const {
      bookmarkLoggedinTemplate, bookmarkNotLoggedTemplate, bookmarkSavednewsTemplate, cardBookmark,
    } = this._blockElements;
    const bookmarkNode = this._domElement.querySelector(cardBookmark);
    let template;

    if (isLogged && type === 'main') {
      template = bookmarkLoggedinTemplate;
    } else if (!isLogged && type === 'main') {
      template = bookmarkNotLoggedTemplate;
    } else if (isLogged && type === 'saved') {
      template = bookmarkSavednewsTemplate;
    }

    const bookmarkElement = template.cloneNode(true).content;
    bookmarkNode.appendChild(bookmarkElement);
  }

  _createCard() {
    if (this._blockElements && this._props) {
      this._createDomElement();
      this._setBookmark();
      this._updateDomElementContent();
    }
  }

  getCardMarkup() {
    return this._domElement;
  }

  deleteCard() {
    this._unmount();
  }
}
