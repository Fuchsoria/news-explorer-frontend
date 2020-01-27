import './index.css';

import Header from './js/components/Header';
import STORAGE from './js/constants/storage';
import { mainApiLinks, newsApiParams, newsApiLink } from './js/constants/index';
import MainApi from './js/api/MainApi';
import NewsApi from './js/api/NewsApi';

// Пропсы: объект с цветом light либо dark, домэлемент навигации
const header = new Header({ color: 'light' }, document.querySelector('.nav'));

// Пропсы в объекте: залогинен ли пользователь, имя пользователя, шаблоны разных состояний шапки

// header.render({
//   isLoggedIn: false,
//   userName: 'Герман',
//   notLoggedLightTemplate: document.querySelector('#nav-notlogged-light'),
//   loggedLightTemplate: document.querySelector('#nav-logged-light'),
//   loggedDarkTemplate: document.querySelector('#nav-logged-dark'),
// });

header.render({
  isLoggedIn: false,
  userName: 'Герман',
  notLoggedLightTemplate: document.querySelector('#nav-notlogged-light'),
  loggedLightTemplate: document.querySelector('#nav-logged-light'),
  loggedDarkTemplate: document.querySelector('#nav-logged-dark'),
});

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
