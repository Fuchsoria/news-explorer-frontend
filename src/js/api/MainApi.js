export default class MainApi {
  constructor(apiLinks) {
    this._apiLinks = apiLinks;
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
    }).then((resp) => resp.json())
      .catch((err) => console.log(err));
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

  getUserData() {
    return fetch(this._apiLinks.getUserData, {
      method: 'GET',
      credentials: 'include',
    }).then((resp) => resp.json())
      .catch((err) => console.log(err));
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
