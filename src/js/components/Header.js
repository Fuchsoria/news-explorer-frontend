import BaseComponent from './BaseComponent';

export default class Header extends BaseComponent {
  constructor(...args) {
    super(...args);

    this.render = this.render.bind(this);
    this.openMobileNavbar = this.openMobileNavbar.bind(this);
    this.closeMobileNavbar = this.closeMobileNavbar.bind(this);
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

  _initialMobileNavbar() {
    const {
      navBurger, navbar, navItems, overlay,
    } = this._blockElements;

    this._navbar = this._domElement.querySelector(navbar);
    this._navItems = this._domElement.querySelector(navItems);
    this._navBurger = this._domElement.querySelector(navBurger);
    this._overlay = this._domElement.querySelector(overlay);
  }

  _cleanupOpenedNavbar() {
    const {
      navbarOpened, overlayOpened,
    } = this._blockElements;

    if (this._navbar && this._overlay) {
      this._navbar.classList.remove(navbarOpened);
      this._overlay.classList.remove(overlayOpened);
    }
  }

  openMobileNavbar() {
    const {
      navBurger, navBurgerOpened, navbarOpened, navItemsOpened, overlayOpened,
    } = this._blockElements;

    this._navbar.classList.add(navbarOpened);
    this._navItems.classList.add(navItemsOpened);
    this._navBurger.classList.add(navBurgerOpened);
    this._overlay.classList.add(overlayOpened);

    this._removeHandlers(navBurger, [this.openMobileNavbar], 'click');
    this._setHandlers(navBurger, [this.closeMobileNavbar], 'click');
  }

  closeMobileNavbar() {
    const {
      navBurger, navBurgerOpened, navbarOpened, navItemsOpened, overlayOpened,
    } = this._blockElements;

    this._navbar.classList.remove(navbarOpened);
    this._navItems.classList.remove(navItemsOpened);
    this._navBurger.classList.remove(navBurgerOpened);
    this._overlay.classList.remove(overlayOpened);

    this._removeHandlers(navBurger, [this.closeMobileNavbar], 'click');
    this._setHandlers(navBurger, [this.openMobileNavbar], 'click');
  }

  render(props) {
    const navbarNode = this._domElement.querySelector(this._blockElements.navbar);

    // Убираем предыдущие хандлеры шапки, если они есть
    this._unmount();

    // В случае мобильной авторизации/выхода подчищаем НЕ перерендеривающиеся классы
    this._cleanupOpenedNavbar();

    /* Очищаем навбар и рендерим его заного,
    * innerHTML используется ТОЛЬКО для очистки внутренностей блока */
    navbarNode.innerHTML = '';
    navbarNode.appendChild(this._createElement(props));

    // Инициируем мобильные дом элементы
    this._initialMobileNavbar();

    // Подгружаем необходимые хандлеры
    this._mountHandlers();
  }
}
