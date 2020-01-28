import BaseComponent from './BaseComponent';

export default class Header extends BaseComponent {
  constructor(...args) {
    super(...args);

    this.render = this.render.bind(this);
  }

  _createElement({
    isLoggedIn, userName,
  }) {
    if (isLoggedIn) {
      const template = this._props.color === 'light'
        ? this._blockElements.loggedLightTemplate
        : this._blockElements.loggedDarkTemplate;
      const clone = template.cloneNode(true).content;
      const userNameElement = clone.querySelector('.nav__username');
      userNameElement.textContent = userName;

      this._navContent = clone;
    } else if (!isLoggedIn) {
      const clone = this._blockElements.notLoggedLightTemplate.cloneNode(true).content;

      this._navContent = clone;
    }

    return this._navContent;
  }

  render(props) {
    // Убираем предыдущие хандлеры шапки, если они есть
    this._unmount();

    // Очищаем навбар и рендерим его заного
    this._domElement.innerHTML = '';
    this._domElement.appendChild(this._createElement(props));

    // Подгружаем необходимые хандлеры
    this._mountHandlers();
  }
}
