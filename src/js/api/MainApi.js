export default class MainApi {
  constructor(apiLinks) {
    this._apiLinks = apiLinks;
    this.getUserData = this.getUserData.bind(this);
    this.logout = this.logout.bind(this);
    this.createArticle = this.createArticle.bind(this);
    this.removeArticle = this.removeArticle.bind(this);
  }

  signup({ email, password, name }) {
    return fetch(this._apiLinks.signup, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    }).catch((err) => console.log(err));
  }

  signin({ email, password }) {
    return fetch(this._apiLinks.signin, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).catch((err) => console.log(err));
  }

  logout() {
    return fetch(this._apiLinks.logout, {
      method: 'POST',
      credentials: 'include',
    }).catch((err) => console.log(err));
  }

  getUserData() {
    return fetch(this._apiLinks.getUserData, {
      method: 'GET',
      credentials: 'include',
    })
      .then((resp) => {
        if (resp.status !== 200) {
          throw new Error('Unauthorized');
        }
        return resp.json();
      })
      .catch((err) => console.log(err.message));
  }

  getArticles() {
    return fetch(this._apiLinks.getArticles, {
      method: 'GET',
      credentials: 'include',
    }).then((resp) => resp.json())
      .catch((err) => console.log(err));
  }

  createArticle({
    keyword, title, text, date, source, link, image,
  }) {
    return fetch(this._apiLinks.createArticle, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
      }),
    }).then((resp) => resp.json())
      .catch((err) => console.log(err));
  }

  removeArticle(articleId) {
    return fetch(`${this._apiLinks.getArticles}/${articleId}`, {
      method: 'DELETE',
      credentials: 'include',
    }).then((resp) => resp.json())
      .catch((err) => console.log(err));
  }
}
