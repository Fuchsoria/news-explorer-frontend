import BaseComponent from './BaseComponent';

export default class Header extends BaseComponent {
  constructor({ color },
    _domElement, _handlers, _setHandlers, _removeHandlers, _mounts, _mount, _unmount) {
    super(_domElement, _handlers, _setHandlers, _removeHandlers, _mounts, _mount, _unmount);

    this._color = color;
    this.render = this.render.bind(this);
  }

  _createElement({
    isLoggedIn, userName, notLoggedLightTemplate, loggedLightTemplate, loggedDarkTemplate,
  }) {
    if (isLoggedIn) {
      const template = this._color === 'light' ? loggedLightTemplate : loggedDarkTemplate;
      const clone = template.cloneNode(true).content;
      const userNameElement = clone.querySelector('.nav__username');
      userNameElement.textContent = userName;

      this._navContent = clone;
    } else if (!isLoggedIn) {
      const clone = notLoggedLightTemplate.cloneNode(true).content;

      this._navContent = clone;
    }

    return this._navContent;
  }

  render(props) {
    const { isLoggedIn } = props;

    if (this._mounts.length > 0) {
      this._unmount();
    }

    // Очищаем навбар и рендерим его заного
    this._domElement.innerHTML = '';
    this._domElement.appendChild(this._createElement(props));

    if (isLoggedIn) {
      console.log('И сюда хандлеры!');
    } else if (!isLoggedIn) {
      const { popupSignin } = this._handlers;
      this._mount('.nav__auth-button', [popupSignin]);
    }
  }
}
