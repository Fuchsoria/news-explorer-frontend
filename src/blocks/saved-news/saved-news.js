import './saved-news.css';
import BaseComponent from '../../js/components/BaseComponent';

export default class SavedNews extends BaseComponent {
  constructor(...args) {
    super(...args);

    this.initialSavedNews = this.initialSavedNews.bind(this);
    this.getUserArticles = this.getUserArticles.bind(this);
  }

  _renderSavedArticles() {
    if (this._dependecies.results && this._articles) {
      const { results } = this._dependecies;

      results.initialSavedResults(this._articles);
    }
  }

  /**
   * Deletes the card object from the objects stored inside the component
   * and updates user information
   * @param  {string} serverId - id card on the backend
   */
  deleteSavedCard(serverId) {
    this._articles = this._articles.filter((article) => article._id !== serverId);

    if (this._dependecies.saved) {
      const { saved } = this._dependecies;

      saved.updateUserInfo(this._articles, this._userName);
    }
  }

  /**
   * Sends an api request to receive saved news
   */
  getUserArticles() {
    if (this._dependecies.mainApi && this._dependecies.auth && this._dependecies.saved) {
      const { mainApi, auth, saved } = this._dependecies;
      this._userName = auth.getUserName();
      mainApi
        .getArticles()
        .then((res) => {
          this._articles = res;
          this._renderSavedArticles();
          saved.updateUserInfo(this._articles, this._userName);
        })
        .catch((err) => console.log(err));
    }
  }

  /**
   * External method to initialize saved news
   */
  initialSavedNews() {
    this.getUserArticles();
  }
}
