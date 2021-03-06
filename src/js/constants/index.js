const MAIN_API_DOMAIN = 'https://news-api.fuchsoria.dev';

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
const NEWS_API_LINK = 'https://praktikum.tk/news/v2/everything?';

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

const SIGNIN_FORM_ELEMENTS = { form: '.form_signin', email: 'email', password: 'password' };
const SIGNUP_FORM_ELEMENTS = {
  form: '.form_signup',
  email: 'email',
  password: 'password',
  name: 'name',
};
const SEARCH_FORM_ELEMENTS = { form: '.search__form', search: 'search' };

const FORM_ERRORS_TEXT = {
  wrongEmailFormat: 'Invalid email format',
  wrongEmailOrPassword: 'Invalid email or password',
  emptyField: 'The field cannot be empty',
  serverError: 'Server Error Occurred',
  conflict: 'User with this Email is already registered',
  connectionLost: 'Failed to send request, check connection',
  emptyQuery: 'Need to enter a keyword',
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

const DATE_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const RESULTS_ELEMENTS = {
  resultsTemplate: document.querySelector('#results'),
  savedResultsTemplate: document.querySelector('#saved-results'),
  resultsErrorTemplate: document.querySelector('#results-error'),
  noResultsTemplate: document.querySelector('#no-results'),
  loadingTemplate: document.querySelector('#loading'),
  showMoreButtonTemplate: document.querySelector('#show-more'),
};

const CARD_ELEMENTS = {
  cardTemplate: document.querySelector('#card'),
  bookmarkLoggedinTemplate: document.querySelector('#bookmark-loggedin'),
  bookmarkNotLoggedTemplate: document.querySelector('#bookmark-notloggedin'),
  bookmarkSavednewsTemplate: document.querySelector('#bookmark-savednews'),
  cardTitle: '.card__title',
  cardDate: '.card__date',
  cardText: '.card__text',
  cardSource: '.card__source',
  cardBookmark: '.card__bookmark',
  cardImg: '.card__img',
  cardKeyword: '.card__keyword',
  cardLink: '.card__link',
};

const SAVED_ELEMENTS = {
  keywordsForOneTemplate: document.querySelector('#keywords-one'),
  keywordsForTwoTemplate: document.querySelector('#keywords-two'),
  keywordsForThreeTemplate: document.querySelector('#keywords-three'),
  keywordsForManyTemplate: document.querySelector('#keywords-many'),
  savedArticlesTemplate: document.querySelector('#saved-articles'),
  articlesCount: '.saved__articles-count',
  count: '.saved__count',
  username: '.saved__username',
  keywords: '.saved__keywords',
  firstKeyword: '.saved__first-keyword',
  secondKeyword: '.saved__second-keyword',
  thirdKeyword: '.saved__third-keyword',
  restKeywords: '.saved__rest-keywords',
};

const MAIN_PAGE_BLOCKS = {
  header: document.querySelector('.header'),
  popup: document.querySelector('.popup'),
  search: document.querySelector('.search'),
  results: document.querySelector('.results'),
};
const SAVED_PAGE_BLOCKS = {
  header: document.querySelector('.header'),
  saved: document.querySelector('.saved'),
  results: document.querySelector('.results'),
};

const NEWS_CHUNKS = {
  maxItemsPerChunk: 3,
};

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
  RESULTS_ELEMENTS,
  CARD_ELEMENTS,
  SAVED_ELEMENTS,
  MAIN_PAGE_BLOCKS,
  SAVED_PAGE_BLOCKS,
  NEWS_CHUNKS,
};
