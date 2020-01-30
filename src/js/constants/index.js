const mainApiDomain = 'https://api.news-explorer.info';

const mainApiLinks = {
  signup: `${mainApiDomain}/signup`,
  signin: `${mainApiDomain}/signin`,
  getUserData: `${mainApiDomain}/users/me`,
  getArticles: `${mainApiDomain}/articles`,
  createArticle: `${mainApiDomain}/articles`,
  removeArticle: `${mainApiDomain}/articles`,
  logout: `${mainApiDomain}/logout`,
};

const newsApiParams = {
  sortBy: 'popularity',
  apiKey: '8059f596a47c4f5b91e73ee4e8a374d9',
  pageSize: 100,
};
const newsApiLink = 'https://newsapi.org/v2/everything?';

const formErrorsText = {
  wrongEmailFormat: 'Неправильный формат email',
  wrongEmailOrPassword: 'Неверная почта или пароль',
  emptyField: 'Поле не может быть пустым',
  serverError: 'Произошла серверная ошибка',
  conflict: 'Пользователь с данным Email уже зарегистрирован',
};

const headerElements = {
  authButton: '.nav__auth-button',
};

export {
  mainApiLinks, mainApiDomain, newsApiParams, newsApiLink, formErrorsText, headerElements,
};
