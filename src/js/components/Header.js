import BaseComponent from './BaseComponent';

export default class Header extends BaseComponent {
  constructor({ color }, _domElement, _setHandlers, _removeHandlers) {
    super(_domElement, _setHandlers, _removeHandlers);

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

  render(...props) {
    // Очищаем навбар и рендерим его заного
    this._domElement.innerHTML = '';
    this._domElement.appendChild(this._createElement(...props));
  }
}
