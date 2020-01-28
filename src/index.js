import './index.css';

import Header from './js/components/Header';
import Popup from './js/components/Popup';
import STORAGE from './js/constants/storage';
import { mainApiLinks, newsApiParams, newsApiLink } from './js/constants/index';
import MainApi from './js/api/MainApi';
import NewsApi from './js/api/NewsApi';

// Пропсы: объект с цветом light либо dark, домэлемент навигации


const popupSignup = new Popup(
  { templateName: '#popup-signup', container: '.popup__container', closeElement: '.popup__close-area' },
  document.querySelector('.popup'),
);
const popupRegistered = new Popup(
  { templateName: '#popup-registered', container: '.popup__container', closeElement: '.popup__close-area' },
  document.querySelector('.popup'),
);
const popupSignin = new Popup(
  { templateName: '#popup-signin', container: '.popup__container', closeElement: '.popup__close-area' },
  document.querySelector('.popup'),
);

popupSignup.setMountHandlers([{ element: '.popup__link', handlers: [popupSignin.open] }]);
popupSignin.setMountHandlers([{ element: '.popup__link', handlers: [popupSignup.open] }]);

/*
* Первым аргументом передаём пропсы, вторым основной домЭлемент,
*/
const header = new Header({ color: 'light' },
  document.querySelector('.nav'));

/*
* Подключаем необходимые хандлеры, которые будут использованы
*/
header.setMountHandlers([{ element: '.nav__auth-button', handlers: [popupSignin.open] }]);

header.render({
  isLoggedIn: false,
  userName: 'Герман',
  notLoggedLightTemplate: document.querySelector('#nav-notlogged-light'),
  loggedLightTemplate: document.querySelector('#nav-logged-light'),
  loggedDarkTemplate: document.querySelector('#nav-logged-dark'),
});


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
