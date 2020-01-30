import './index.css';

import validator from 'validator';
import xss from 'xss';
import Header from './js/components/Header';
import Popup from './js/components/Popup';
import Form from './js/components/Form';
import Auth from './js/modules/auth';
import {
  mainApiLinks, newsApiParams, newsApiLink, formErrorsText, headerElements,
} from './js/constants/index';
import MainApi from './js/api/MainApi';
import NewsApi from './js/api/NewsApi';

const auth = new Auth();
const mainApi = new MainApi(mainApiLinks);
const newsApi = new NewsApi(newsApiLink, newsApiParams);

const popupRegistered = new Popup(
  document.querySelector('.popup'),
  { templateName: '#popup-registered', container: '.popup__container', closeElement: '.popup__close-area' },
);
const popupSignup = new Popup(
  document.querySelector('.popup'),
  { templateName: '#popup-signup', container: '.popup__container', closeElement: '.popup__close-area' },
);
const popupSignin = new Popup(
  document.querySelector('.popup'),
  { templateName: '#popup-signin', container: '.popup__container', closeElement: '.popup__close-area' },
);

// Первым аргументом передаём дом элемент, вторым передаём шаблоны, третьим пропсы,
const header = new Header(
  document.querySelector('.nav'), {
    notLoggedLightTemplate: document.querySelector('#nav-notlogged-light'),
    loggedLightTemplate: document.querySelector('#nav-logged-light'),
    loggedDarkTemplate: document.querySelector('#nav-logged-dark'),
  }, { color: 'light' },
);


const signinForm = new Form(document.querySelector('.popup'),
  { form: '.form_login', email: 'email', password: 'password' },
  { formName: 'signinForm' });
const signupForm = new Form(document.querySelector('.popup'),
  {
    form: '.form_signup', email: 'email', password: 'password', name: 'name',
  },
  { formName: 'signupForm' });
const searchForm = new Form(document.querySelector('.popup'),
  { form: '.search__form', search: 'search' },
  { formName: 'searchForm' });

signinForm.setDependecies({
  validator, xss, mainApi, formErrorsText, auth, popupSignin,
});
signupForm.setDependecies({
  validator, xss, mainApi, formErrorsText, popupSignup, popupRegistered,
});
searchForm.setDependecies({ validator/* валидация, ивент при сабмите */ });

popupSignup.setDependecies({ popupSignin, signupForm, popupRegistered });
popupSignin.setDependecies({ popupSignup, signinForm });
popupRegistered.setDependecies({ popupSignin, signinForm });


auth.setDependecies({
  mainApi, header, popupSignin, headerElements,
});

auth.sendCheckRequest();


// mainApi.getArticles()
//   .then((resp) => console.log(resp))
//   .catch((err) => console.log(err));

// mainApi.createArticle({
//   keyword: 'ключ',
//   title: 'Титул',
//   text: 'Текст',
//   date: '21.01.2020',
//   source: 'сырки',
//   link: 'https://google.ru',
//   image: 'https://www.google.ru/',
// })
//   .then((resp) => console.log(resp))
//   .catch((err) => console.log(err));

// mainApi.removeArticle('5e2f4549b84adb24f69dbd0b')
//   .then((resp) => console.log(resp))
//   .catch((err) => console.log(err));

// newsApi.getNews('человек')
//   .then((resp) => console.log(resp))
//   .catch((err) => console.log(err));
