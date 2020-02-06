import './index.css';
import validator from 'validator';
import xss from 'xss';
import Header from './blocks/header/header';
import Results from './blocks/results/results';
import Search from './blocks/search/search';
import PopupSignin from './blocks/popup/_signin/popup_signin';
import PopupSignup from './blocks/popup/_signup/popup_signup';
import PopupRegistered from './blocks/popup/_registered/popup_registered';
import FormSignin from './blocks/form/_signin/form_signin';
import FormSignup from './blocks/form/_signup/form_signup';
import NewsChunks from './js/modules/newsChunks';
import Auth from './js/modules/auth';
import {
  MAIN_API_LINKS, NEWS_API_PARAMS, NEWS_API_LINK, FORM_ERRORS_TEXT, HEADER_ELEMENTS,
  POPUP_REGISTERED_ELEMENTS, POPUP_SIGNUP_ELEMENTS, POPUP_SIGNIN_ELEMENTS,
  SIGNIN_FORM_ELEMENTS, SIGNUP_FORM_ELEMENTS, SEARCH_FORM_ELEMENTS,
  RESULTS_ELEMENTS, CARD_ELEMENTS, MAIN_PAGE_BLOCKS, NEWS_CHUNKS,
} from './js/constants/index';
import {
  formatCurrentDate,
  formatWeekBeforeDate,
  formatNewsDate,
  createCardInstance,
} from './js/utils';
import MainApi from './js/api/MainApi';
import NewsApi from './js/api/NewsApi';

const auth = new Auth();
const newsChunks = new NewsChunks(NEWS_CHUNKS);

const mainApi = new MainApi(MAIN_API_LINKS);
const newsApi = new NewsApi(NEWS_API_LINK, NEWS_API_PARAMS, {
  formatCurrentDate,
  formatWeekBeforeDate,
});

const popupRegistered = new PopupRegistered(MAIN_PAGE_BLOCKS.popup, POPUP_REGISTERED_ELEMENTS);
const popupSignup = new PopupSignup(MAIN_PAGE_BLOCKS.popup, POPUP_SIGNUP_ELEMENTS);
const popupSignin = new PopupSignin(MAIN_PAGE_BLOCKS.popup, POPUP_SIGNIN_ELEMENTS);

const header = new Header(
  MAIN_PAGE_BLOCKS.header, HEADER_ELEMENTS, { color: 'light' },
);

const formSignin = new FormSignin(MAIN_PAGE_BLOCKS.popup, SIGNIN_FORM_ELEMENTS);
const formSignup = new FormSignup(MAIN_PAGE_BLOCKS.popup, SIGNUP_FORM_ELEMENTS);
const search = new Search(MAIN_PAGE_BLOCKS.search, SEARCH_FORM_ELEMENTS);

const results = new Results(MAIN_PAGE_BLOCKS.results, RESULTS_ELEMENTS, { page: 'index' });


formSignin.setDependecies({
  validator, xss, mainApi, FORM_ERRORS_TEXT, auth, popupSignin,
});
formSignup.setDependecies({
  validator, xss, mainApi, FORM_ERRORS_TEXT, popupSignup, popupRegistered,
});
search.setDependecies({
  validator, xss, FORM_ERRORS_TEXT, newsApi, auth, results,
});

popupSignup.setDependecies({ popupSignin, formSignup, popupRegistered });
popupSignin.setDependecies({ popupSignup, formSignin });
popupRegistered.setDependecies({ popupSignin, formSignin });

results.setDependecies({
  newsChunks, formatNewsDate, createCardInstance, CARD_ELEMENTS, auth, mainApi,
});

auth.setDependecies({
  mainApi, header, popupSignin, HEADER_ELEMENTS, results,
});

auth.sendCheckRequest();

search.handlers();
