import './index.css';

import Header from './js/components/Header';
import STORAGE from './js/constants/storage';

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

console.log(STORAGE);

STORAGE.items = ['test1', 'test2'];
STORAGE.name = 'Герман';

console.log(STORAGE);
