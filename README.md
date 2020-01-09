# Дипломная работа news-explorer

## Описание
Инфраструктура фронтенда дипломной работы и вёрстка страниц макета

## Установка
Для установки необходимо наличие установленного nodejs и npm.

Сохраните проект у себя на компьютере:

    git clone <project link>

В корне проекта через консоль/терминал запустите команду:

    npm install
### После успешной установки станут доступны команды: 
Поднятие локального сервера с режимом разработки:

    npm run dev
Сборка продакшн версии:

    npm run build

Деплой на gh-pages:

    npm run deploy

## Страницы (Локально)

### Главная страница (Неавторизован)
[https://fuchsoria.github.io/news-explorer-frontend](https://fuchsoria.github.io/news-explorer-frontend)
### Главная страница (Авторизован)
[https://fuchsoria.github.io/news-explorer-frontend/mainloggedin](https://fuchsoria.github.io/news-explorer-frontend/mainloggedin)
### Главная страница - Результаты (Неавторизован)
[https://fuchsoria.github.io/news-explorer-frontend/mainresultsnotloggedin](https://fuchsoria.github.io/news-explorer-frontend/mainresultsnotloggedin)
### Главная страница - Результаты (Авторизован)
[https://fuchsoria.github.io/news-explorer-frontend/mainresultsloggedin](https://fuchsoria.github.io/news-explorer-frontend/mainresultsloggedin)
### Главная страница - Поиск результатов (Неавторизован)
[https://fuchsoria.github.io/news-explorer-frontend/mainresultsloading](https://fuchsoria.github.io/news-explorer-frontend/mainresultsloading)
### Главная страница - Нет результатов (Неавторизован)
[https://fuchsoria.github.io/news-explorer-frontend/mainresultsnoresults](https://fuchsoria.github.io/news-explorer-frontend/mainresultsnoresults)
### Страница сохраненных новостей (Авторизован)
[https://fuchsoria.github.io/news-explorer-frontend/savednews](https://fuchsoria.github.io/news-explorer-frontend/savednews)

## Команды для тестирования вёрстки:
### Для открытия/закрытия мобильного меню при разрешение меньше 768px:

    document.querySelector('.nav').classList.toggle('nav_opened');
    document.querySelector('.nav__items').classList.toggle('nav__items_opened');
    document.querySelector('.nav__burger').classList.toggle('nav__burger_opened');
    document.querySelector('.overlay').classList.toggle('overlay_opened');

### Для открытия/закрытия popup Входа

    document.querySelector('.popup_login').classList.toggle('popup_opened');

### Для открытия/закрытия popup Регистрации

    document.querySelector('.popup_signup').classList.toggle('popup_opened');

### Для открытия/закрытия popup после регистрации

    document.querySelector('.popup_registered').classList.toggle('popup_opened');

