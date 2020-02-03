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

  /**
   * Заполняет элементы контента карточки и расставляет необходимые аттрибуты
   */
  _updateDomElementContent() {
    const {
      dataId, keyword, source, title, description, urlToImage, formatedDate, link, type,
    } = this._props;
    const {
      cardTitle, cardDate, cardText, cardSource, cardImg, cardKeyword, cardLink,
    } = this._blockElements;

    if (type === 'saved') {
      this._domElement.setAttribute('data-saved', true);
      this._domElement.querySelector(cardKeyword).classList.remove(`${cardKeyword.replace('.', '')}_hidden`);
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

  /**
   * Устанавливает разметку закладки в зависимости от ситуации и типа страницы
   */
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
    this._cardBookmarkIcon.classList.add('card__bookmark-icon_marked');
  }

  removeBookmarkMarked() {
    this._cardBookmarkIcon.classList.remove('card__bookmark-icon_marked');
  }

  /**
   * Запускает создание и заполнение карточки
   */
  _createCard() {
    if (this._blockElements && this._props) {
      this._createDomElement();
      this._setBookmark();
      this._updateDomElementContent();

      this._cardBookmarkIcon = this._domElement.querySelector('.card__bookmark-icon');
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

  /**
   * Убирает обработчики с компонента и удаляет его ноду
   */
  deleteCard() {
    this._unmount();
    this._domElement.remove();
  }
}
