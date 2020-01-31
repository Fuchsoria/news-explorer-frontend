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

const popupRegisteredElements = {
  templateName: '#popup-registered',
  container: '.popup__container',
  closeElement: '.popup__close-area',
};
const popupSignupElements = {
  templateName: '#popup-signup',
  container: '.popup__container',
  closeElement: '.popup__close-area',
};
const popupSigninElements = {
  templateName: '#popup-signin',
  container: '.popup__container',
  closeElement: '.popup__close-area',
};
const signinFormElements = { form: '.form_login', email: 'email', password: 'password' };
const signupFormElements = {
  form: '.form_signup',
  email: 'email',
  password: 'password',
  name: 'name',
};
const searchFormElements = { form: '.search__form', search: 'search' };

const formErrorsText = {
  wrongEmailFormat: 'Неправильный формат email',
  wrongEmailOrPassword: 'Неверная почта или пароль',
  emptyField: 'Поле не может быть пустым',
  serverError: 'Произошла серверная ошибка',
  conflict: 'Пользователь с данным Email уже зарегистрирован',
};

const headerElements = {
  notLoggedLightTemplate: document.querySelector('#nav-notlogged-light'),
  loggedLightTemplate: document.querySelector('#nav-logged-light'),
  loggedDarkTemplate: document.querySelector('#nav-logged-dark'),
  authButton: '.nav__auth-button',
  navBurger: '.nav__burger',
  navbar: '.nav',
  navItems: '.nav__items',
  overlay: '.overlay',
  navBurgerOpened: 'nav__burger_opened',
  navbarOpened: 'nav_opened',
  navItemsOpened: 'nav__items_opened',
  overlayOpened: 'overlay_opened',
};

export {
  mainApiLinks,
  mainApiDomain,
  newsApiParams,
  newsApiLink,
  formErrorsText,
  headerElements,
  popupRegisteredElements,
  popupSignupElements,
  popupSigninElements,
  signinFormElements,
  signupFormElements,
  searchFormElements,
};
