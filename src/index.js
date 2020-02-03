import './index.css';
import validator from 'validator';
import xss from 'xss';
import Header from './js/components/Header';
import Popup from './js/components/Popup';
import Form from './js/components/Form';
import Auth from './js/modules/auth';
import NewsChunks from './js/components/NewsChunks';
import NewsCardList from './js/components/NewsCardList';
import {
  MAIN_API_LINKS, NEWS_API_PARAMS, NEWS_API_LINK, FORM_ERRORS_TEXT, HEADER_ELEMENTS,
  POPUP_REGISTERED_ELEMENTS, POPUP_SIGNUP_ELEMENTS, POPUP_SIGNIN_ELEMENTS,
  SIGNIN_FORM_ELEMENTS, SIGNUP_FORM_ELEMENTS, SEARCH_FORM_ELEMENTS,
  NEWS_CARD_LIST_ELEMENTS, NEWS_CARD_ELEMENTS,
} from './js/constants/index';
import {
  formatCurrentDate,
  formatWeekBeforeDate,
  formatNewsDate,
} from './js/utils';
import MainApi from './js/api/MainApi';
import NewsApi from './js/api/NewsApi';
import NewsCard from './js/components/NewsCard';

const auth = new Auth();
const newsChunks = new NewsChunks();

const mainApi = new MainApi(MAIN_API_LINKS);
const newsApi = new NewsApi(NEWS_API_LINK, NEWS_API_PARAMS, {
  formatCurrentDate,
  formatWeekBeforeDate,
});

const popupRegistered = new Popup(document.querySelector('.popup'), POPUP_REGISTERED_ELEMENTS, { popupName: 'popupRegistered' });
const popupSignup = new Popup(document.querySelector('.popup'), POPUP_SIGNUP_ELEMENTS, { popupName: 'popupSignup' });
const popupSignin = new Popup(document.querySelector('.popup'), POPUP_SIGNIN_ELEMENTS, { popupName: 'popupSignin' });

const header = new Header(
  document.querySelector('.header'), HEADER_ELEMENTS, { color: 'light' },
);

const signinForm = new Form(document.querySelector('.popup'), SIGNIN_FORM_ELEMENTS, { formName: 'signinForm' });
const signupForm = new Form(document.querySelector('.popup'), SIGNUP_FORM_ELEMENTS, { formName: 'signupForm' });
const searchForm = new Form(document.querySelector('.search'), SEARCH_FORM_ELEMENTS, { formName: 'searchForm' });

const newsCardList = new NewsCardList(document.querySelector('.results'), NEWS_CARD_LIST_ELEMENTS, { page: 'index' });

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
  newsChunks, formatNewsDate, NewsCard, NEWS_CARD_ELEMENTS, auth, mainApi,
});

auth.setDependecies({
  mainApi, header, popupSignin, HEADER_ELEMENTS, newsCardList,
});

auth.sendCheckRequest();

searchForm.handlers();
