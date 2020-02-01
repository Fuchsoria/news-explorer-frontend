const MAIN_API_DOMAIN = 'https://api.news-explorer.info';

const MAIN_API_LINKS = {
  signup: `${MAIN_API_DOMAIN}/signup`,
  signin: `${MAIN_API_DOMAIN}/signin`,
  getUserData: `${MAIN_API_DOMAIN}/users/me`,
  getArticles: `${MAIN_API_DOMAIN}/articles`,
  createArticle: `${MAIN_API_DOMAIN}/articles`,
  removeArticle: `${MAIN_API_DOMAIN}/articles`,
  logout: `${MAIN_API_DOMAIN}/logout`,
};

const NEWS_API_PARAMS = {
  sortBy: 'popularity',
  apiKey: '8059f596a47c4f5b91e73ee4e8a374d9',
  pageSize: 100,
};
const NEWS_API_LINK = 'https://newsapi.org/v2/everything?';

const POPUP_REGISTERED_ELEMENTS = {
  templateName: '#popup-registered',
  container: '.popup__container',
  closeElement: '.popup__close-area',
};
const POPUP_SIGNUP_ELEMENTS = {
  templateName: '#popup-signup',
  container: '.popup__container',
  closeElement: '.popup__close-area',
};
const POPUP_SIGNIN_ELEMENTS = {
  templateName: '#popup-signin',
  container: '.popup__container',
  closeElement: '.popup__close-area',
};

const SIGNIN_FORM_ELEMENTS = { form: '.form_login', email: 'email', password: 'password' };
const SIGNUP_FORM_ELEMENTS = {
  form: '.form_signup',
  email: 'email',
  password: 'password',
  name: 'name',
};
const SEARCH_FORM_ELEMENTS = { form: '.search__form', search: 'search' };

const FORM_ERRORS_TEXT = {
  wrongEmailFormat: 'Неправильный формат email',
  wrongEmailOrPassword: 'Неверная почта или пароль',
  emptyField: 'Поле не может быть пустым',
  serverError: 'Произошла серверная ошибка',
  conflict: 'Пользователь с данным Email уже зарегистрирован',
  emptyQuery: 'Нужно ввести ключевое слово',
};

const HEADER_ELEMENTS = {
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

const DATE_MONTHS = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

export {
  MAIN_API_LINKS,
  MAIN_API_DOMAIN,
  NEWS_API_PARAMS,
  NEWS_API_LINK,
  FORM_ERRORS_TEXT,
  HEADER_ELEMENTS,
  POPUP_REGISTERED_ELEMENTS,
  POPUP_SIGNUP_ELEMENTS,
  POPUP_SIGNIN_ELEMENTS,
  SIGNIN_FORM_ELEMENTS,
  SIGNUP_FORM_ELEMENTS,
  SEARCH_FORM_ELEMENTS,
  DATE_MONTHS,
};
