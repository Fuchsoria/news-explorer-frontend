import './index.css';
import validator from 'validator';
import xss from 'xss';
import Header from './js/components/Header';
import PopupSignin from './js/components/PopupSignin';
import PopupSignup from './js/components/PopupSignup';
import PopupRegistered from './js/components/PopupRegistered';
import FormSearch from './js/components/FormSearch';
import FormSignin from './js/components/FormSignin';
import FormSignup from './js/components/FormSignup';
import Auth from './js/modules/auth';
import NewsChunks from './js/components/NewsChunks';
import NewsCardList from './js/components/NewsCardList';
import {
  MAIN_API_LINKS, NEWS_API_PARAMS, NEWS_API_LINK, FORM_ERRORS_TEXT, HEADER_ELEMENTS,
  POPUP_REGISTERED_ELEMENTS, POPUP_SIGNUP_ELEMENTS, POPUP_SIGNIN_ELEMENTS,
  SIGNIN_FORM_ELEMENTS, SIGNUP_FORM_ELEMENTS, SEARCH_FORM_ELEMENTS,
  NEWS_CARD_LIST_ELEMENTS, NEWS_CARD_ELEMENTS, MAIN_PAGE_BLOCKS, NEWS_CHUNKS,
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
const newsChunks = new NewsChunks(false, false, NEWS_CHUNKS);

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

const signinForm = new FormSignin(MAIN_PAGE_BLOCKS.popup, SIGNIN_FORM_ELEMENTS);
const signupForm = new FormSignup(MAIN_PAGE_BLOCKS.popup, SIGNUP_FORM_ELEMENTS);
const searchForm = new FormSearch(MAIN_PAGE_BLOCKS.search, SEARCH_FORM_ELEMENTS);

const newsCardList = new NewsCardList(MAIN_PAGE_BLOCKS.results, NEWS_CARD_LIST_ELEMENTS, { page: 'index' });

signinForm.setDependecies({
  validator, xss, mainApi, FORM_ERRORS_TEXT, auth, popupSignin,
});
signupForm.setDependecies({
  validator, xss, mainApi, FORM_ERRORS_TEXT, popupSignup, popupRegistered,
});
searchForm.setDependecies({
  validator, xss, FORM_ERRORS_TEXT, newsApi, auth, newsCardList,
});

popupSignup.setDependecies({ popupSignin, signupForm, popupRegistered });
popupSignin.setDependecies({ popupSignup, signinForm });
popupRegistered.setDependecies({ popupSignin, signinForm });

newsCardList.setDependecies({
  newsChunks, formatNewsDate, createCardInstance, NEWS_CARD_ELEMENTS, auth, mainApi,
});

auth.setDependecies({
  mainApi, header, popupSignin, HEADER_ELEMENTS, newsCardList,
});

auth.sendCheckRequest();

searchForm.handlers();
