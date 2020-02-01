export default class Auth {
  constructor() {
    this.sendCheckRequest = this.sendCheckRequest.bind(this);
    this.userLogout = this.userLogout.bind(this);
    this._loggedIn = false;
  }

  setDependecies(dependecies) {
    this._dependecies = dependecies;
  }

  userLogout() {
    if (this._dependecies.mainApi) {
      const { logout } = this._dependecies.mainApi;

      logout()
        .then((resp) => {
          if (resp.status === 200) {
            this._setUnauthorizedComponents();
          }
        });
    }
  }

  getUserAuthStatus() {
    return this._loggedIn;
  }

  _setUnauthorizedComponents() {
    this._loggedIn = false;

    if (this._dependecies.header
      && this._dependecies.popupSignin
      && this._dependecies.HEADER_ELEMENTS) {
      const { header, popupSignin, HEADER_ELEMENTS } = this._dependecies;
      // Подключаем необходимые хандлеры, которые будут использованы после рендера
      header.setMountHandlers(
        [{ element: HEADER_ELEMENTS.authButton, handlers: [popupSignin.open] },
          { element: HEADER_ELEMENTS.navBurger, handlers: [header.openMobileNavbar] }],
      );

      header.render({
        isLoggedIn: this._loggedIn,

      });
    }
  }

  _setAuthorizedComponents() {
    this._loggedIn = true;

    if (this._dependecies.header && this._dependecies.HEADER_ELEMENTS) {
      const { header, HEADER_ELEMENTS } = this._dependecies;

      header.setMountHandlers(
        [{ element: HEADER_ELEMENTS.authButton, handlers: [this.userLogout] },
          { element: HEADER_ELEMENTS.navBurger, handlers: [header.openMobileNavbar] }],
      );

      header.render({
        isLoggedIn: this._loggedIn,
        userName: this._userName,
      });
    }
  }

  sendCheckRequest() {
    if (this._dependecies.mainApi) {
      const { getUserData } = this._dependecies.mainApi;

      getUserData()
        .then((result) => {
          if (result) {
            this._userName = result.name;
            this._setAuthorizedComponents();
          } else {
            throw new Error('Unauthrized');
          }
        })
        .catch(() => {
          this._setUnauthorizedComponents();
        });
    }
  }
}
