import BaseComponent from './BaseComponent';

export default class NewsCard extends BaseComponent {
  constructor(...args) {
    super(...args);

    this._createCard();
    this.getCardMarkup = this.getCardMarkup.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.setBookmarkMarked = this.setBookmarkMarked.bind(this);
    this.removeBookmarkMarked = this.removeBookmarkMarked.bind(this);
  }

  _createDomElement() {
    const { cardTemplate } = this._blockElements;
    this._domElement = cardTemplate.cloneNode(true).content.querySelector('.card');
  }

  _updateDomElementContent() {
    const {
      dataId, keyword, source, title, description, urlToImage, formatedDate, link, type,
    } = this._props;
    const {
      cardTitle, cardDate, cardText, cardSource, cardImg, cardKeyword, cardLink,
    } = this._blockElements;

    if (type === 'saved') {
      this._domElement.setAttribute('data-saved', true);
    }

    this._domElement.setAttribute('data-id', dataId);
    this._domElement.querySelector(cardTitle).textContent = title;
    this._domElement.querySelector(cardDate).textContent = formatedDate;
    this._domElement.querySelector(cardText).textContent = description;
    this._domElement.querySelector(cardSource).textContent = source;
    this._domElement.querySelector(cardKeyword).textContent = keyword;
    this._domElement.querySelector(cardImg).src = urlToImage;
    this._domElement.querySelector(cardLink).href = link;
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

  setBookmarkMarked() {
    this._domElement.querySelector('.card__bookmark-icon').classList.add('card__bookmark-icon_marked');
  }

  removeBookmarkMarked() {
    this._domElement.querySelector('.card__bookmark-icon').classList.remove('card__bookmark-icon_marked');
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

  getCardProps() {
    const {
      keyword, source, title, description, urlToImage, publishedAt, link, serverId,
    } = this._props;

    return {
      keyword,
      source,
      title,
      link,
      text: description,
      image: urlToImage,
      date: publishedAt,
      serverId,
    };
  }

  deleteCard() {
    this._domElement.remove();
    this._unmount();
  }
}
