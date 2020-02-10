import './saved.css';
import BaseComponent from '../../js/components/BaseComponent';

export default class Saved extends BaseComponent {
  constructor(...args) {
    super(...args);

    this.updateUserInfo = this.updateUserInfo.bind(this);
  }

  /**
   * Рендерит информацию о количестве сохраненных новостей
   */
  _renderArticlesCount(articles, userName) {
    if (this._blockElements) {
      const {
        savedArticlesTemplate, articlesCount, count, username,
      } = this._blockElements;
      const domElement = this._domElement.querySelector(articlesCount);
      const markup = savedArticlesTemplate.cloneNode(true).content;

      markup.querySelector(username).textContent = userName;
      markup.querySelector(count).textContent = articles.length;

      this._clearNodeContent(domElement);
      domElement.appendChild(markup);
    }
  }

  /**
   * Вытягивает ключевые слова, уникализирует их и сортирует по самым популярным
   * Далее рандерит их в соответствие с требованием отображения
   */
  _renderKeywords(articles) {
    if (this._blockElements && articles) {
      const {
        keywordsForOneTemplate, keywordsForTwoTemplate, keywordsForThreeTemplate,
        keywordsForManyTemplate, keywords, firstKeyword, secondKeyword, thirdKeyword, restKeywords,
      } = this._blockElements;
      const keywordsArray = articles.map((item) => item.keyword);
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

      if (articles.length > 0) {
        this._clearNodeContent(domElement);
        domElement.appendChild(markup);
      } else {
        this._clearNodeContent(domElement);
      }
    }
  }

  updateUserInfo(articles, nickName) {
    this._renderArticlesCount(articles, nickName);
    this._renderKeywords(articles);
  }
}
