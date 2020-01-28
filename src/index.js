import './index.css';

import Header from './js/components/Header';
import Popup from './js/components/Popup';
import Form from './js/components/Form';
import STORAGE from './js/constants/storage';
import { mainApiLinks, newsApiParams, newsApiLink } from './js/constants/index';
import MainApi from './js/api/MainApi';
import NewsApi from './js/api/NewsApi';

// Пропсы: объект с цветом light либо dark, домэлемент навигации


const popupSignup = new Popup(
  document.querySelector('.popup'),
  { templateName: '#popup-signup', container: '.popup__container', closeElement: '.popup__close-area' },
);
const popupRegistered = new Popup(
  document.querySelector('.popup'),
  { templateName: '#popup-registered', container: '.popup__container', closeElement: '.popup__close-area' },
);
const popupSignin = new Popup(
  document.querySelector('.popup'),
  { templateName: '#popup-signin', container: '.popup__container', closeElement: '.popup__close-area' },
);


popupSignup.setDependecies({ popupSignin });
popupSignin.setDependecies({ popupSignup });
// popupSignup.setMountHandlers([{ element: '.popup__link', handlers: [popupSignup.clearContent, popupSignin.setContent] },
//   { element: '.form_signup', handlers: [(e) => { e.preventDefault(); console.log(e); }], event: 'submit' }]);
// popupSignin.setMountHandlers([{ element: '.popup__link', handlers: [popupSignin.clearContent, popupSignup.setContent] }]);


// Первым аргументом передаём пропсы, вторым основной домЭлемент,
const header = new Header(
  document.querySelector('.nav'), {
    notLoggedLightTemplate: document.querySelector('#nav-notlogged-light'),
    loggedLightTemplate: document.querySelector('#nav-logged-light'),
    loggedDarkTemplate: document.querySelector('#nav-logged-dark'),
  }, { color: 'light' },
);

// Подключаем необходимые хандлеры, которые будут использованы после рендера
header.setMountHandlers([{ element: '.nav__auth-button', handlers: [popupSignin.open] }]);

header.render({
  isLoggedIn: false,
  userName: 'Герман',
});


const signinForm = new Form(false, { email: 'email', password: 'password' }, { formName: 'signinForm' });
const signupForm = new Form(false, { email: 'email', password: 'password', name: 'name' }, { formName: 'signipForm' });
const searchForm = new Form(false, { search: 'search' }, { formName: 'searchForm' });


signinForm.setDependecies({/* валидация, ивент при сабмите */});
signupForm.setDependecies({/* валидация, ивент при сабмите */});
searchForm.setDependecies({/* валидация, ивент при сабмите */});

// Пропсы в объекте: залогинен ли пользователь, имя пользователя, шаблоны разных состояний шапки

// header.render({
//   isLoggedIn: false,
//   userName: 'Герман',
//   notLoggedLightTemplate: document.querySelector('#nav-notlogged-light'),
//   loggedLightTemplate: document.querySelector('#nav-logged-light'),
//   loggedDarkTemplate: document.querySelector('#nav-logged-dark'),
// });


// console.log(STORAGE);

// STORAGE.items = ['test1', 'test2'];
// STORAGE.name = 'Герман';

// console.log(STORAGE);

const mainApi = new MainApi(mainApiLinks);
const newsApi = new NewsApi(newsApiLink, newsApiParams);

// mainApi.signup({ email: 'testnew@test.ru', password: 'test', name: 'TestName' })
//   .then((resp) => console.log(resp))
//   .catch((err) => console.log(err));

// mainApi.signin({ email: 'testnew@test.ru', password: 'test' })
//   .then((resp) => console.log(resp))
//   .catch((err) => console.log(err));

// mainApi.getUserData()
//   .then((resp) => console.log(resp))
//   .catch((err) => console.log(err));

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
