import BaseComponent from './BaseComponent';

export default class SavedNews extends BaseComponent {
  constructor(...args) {
    super(...args);

    this.initialSavedNews = this.initialSavedNews.bind(this);
    this.getUserArticles = this.getUserArticles.bind(this);
  }

  /**
   * Рендерит информацию о количестве сохраненных новостей
   */
  _renderArticlesCount() {
    if (this._dependecies.SAVEDNEWS_ELEMENTS) {
      const {
        savedArticlesTemplate, articlesCount, count, username,
      } = this._dependecies.SAVEDNEWS_ELEMENTS;
      const domElement = this._domElement.querySelector(articlesCount);
      const markup = savedArticlesTemplate.cloneNode(true).content;

      markup.querySelector(username).textContent = this._userName;
      markup.querySelector(count).textContent = this._articles.length;

      this._clearNodeContent(domElement);
      domElement.appendChild(markup);
    }
  }

  /**
   * Вытягивает ключевые слова, уникализирует их и сортирует по самым популярным
   * Далее рандерит их в соответствие с требованием отображения
   */
  _renderKeywords() {
    if (this._dependecies.SAVEDNEWS_ELEMENTS && this._articles) {
      const {
        keywordsForOneTemplate, keywordsForTwoTemplate, keywordsForThreeTemplate,
        keywordsForManyTemplate, keywords, firstKeyword, secondKeyword, thirdKeyword, restKeywords,
      } = this._dependecies.SAVEDNEWS_ELEMENTS;
      const keywordsArray = this._articles.map((item) => item.keyword);
      const countWords = keywordsArray.reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
      }, {});
      const sortedByPopular = Object.entries(countWords).sort((a, b) => b[1] - a[1]);
      const uniqueArray = sortedByPopular.map((item) => item[0]);
      const domElement = this._domElement.querySelector(keywords);
      let markup;

      if (uniqueArray.length === 1) {
        const [firstWord] = uniqueArray;
        markup = keywordsForOneTemplate.cloneNode(true).content;

        markup.querySelector(firstKeyword).textContent = firstWord;
      } else if (uniqueArray.length === 2) {
        const [firstWord, secondWord] = uniqueArray;
        markup = keywordsForTwoTemplate.cloneNode(true).content;

        markup.querySelector(firstKeyword).textContent = firstWord;
        markup.querySelector(secondKeyword).textContent = secondWord;
      } else if (uniqueArray.length === 3) {
        const [firstWord, secondWord, thirdWord] = uniqueArray;
        markup = keywordsForThreeTemplate.cloneNode(true).content;

        markup.querySelector(firstKeyword).textContent = firstWord;
        markup.querySelector(secondKeyword).textContent = secondWord;
        markup.querySelector(thirdKeyword).textContent = thirdWord;
      } else if (uniqueArray.length >= 4) {
        const [firstWord, secondWord] = uniqueArray;
        const restCount = uniqueArray.length - 2;
        markup = keywordsForManyTemplate.cloneNode(true).content;

        markup.querySelector(firstKeyword).textContent = firstWord;
        markup.querySelector(secondKeyword).textContent = secondWord;
        markup.querySelector(restKeywords).textContent = restCount;
      }

      if (this._articles.length > 0) {
        this._clearNodeContent(domElement);
        domElement.appendChild(markup);
      } else {
        this._clearNodeContent(domElement);
      }
    }
  }

  _renderSavedArticles() {
    if (this._dependecies.newsCardList && this._articles) {
      const { newsCardList } = this._dependecies;

      newsCardList.initialSavedResults(this._articles);
    }
  }

  _updateUserInfo() {
    this._renderArticlesCount();
    this._renderKeywords();
  }

  /**
   * Удаляет объект карточки из сохраненных внутри компонента объектов
   * и обновляет информацию для пользователя
   * @param  {string} serverId - id карточки на бэкенде
   */
  deleteSavedCard(serverId) {
    this._articles = this._articles.filter((article) => article._id !== serverId);

    this._updateUserInfo();
  }

  /**
   * Отправляет запрос api на получение сохраненных новостей
   */
  getUserArticles() {
    if (this._dependecies.mainApi && this._dependecies.auth) {
      const { mainApi, auth } = this._dependecies;
      this._userName = auth.getUserName();

      mainApi
        .getArticles()
        .then((res) => {
          this._articles = res;
          this._renderSavedArticles();
          this._updateUserInfo();
        })
        .catch((err) => console.log(err));
    }
  }

  /**
   * Внешний метод для инициализации сохраненных новостей
   */
  initialSavedNews() {
    this.getUserArticles();
  }
}
