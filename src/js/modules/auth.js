export default class Auth {
  constructor(page) {
    this.sendCheckRequest = this.sendCheckRequest.bind(this);
    this.userLogout = this.userLogout.bind(this);
    this._loggedIn = false;
    this._userName = '';
    this._page = page;
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

  getUserName() {
    return this._userName;
  }

  _cleanupDependeciesMarkups() {
    if (this._dependecies.results) {
      const { results } = this._dependecies;

      results.clearMarkup();
    }
  }

  _setUnauthorizedComponents() {
    this._loggedIn = false;

    if (this._dependecies.header
      && this._dependecies.popupSignin
      && this._dependecies.HEADER_ELEMENTS) {
      const { header, popupSignin, HEADER_ELEMENTS } = this._dependecies;
      // We connect the necessary handlers that will be used after rendering
      header.setMountHandlers(
        [{ element: HEADER_ELEMENTS.authButton, handlers: [popupSignin.open] },
          { element: HEADER_ELEMENTS.navBurger, handlers: [header.openMobileNavbar] }],
      );

      header.render({ isLoggedIn: this._loggedIn });
    }

    if (this._page === 'saved') {
      window.location.href = '../';
    }

    this._cleanupDependeciesMarkups();
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

      if (this._page === 'saved' && this._dependecies.savedNews) {
        const { savedNews } = this._dependecies;

        savedNews.initialSavedNews();
      }
    }

    this._cleanupDependeciesMarkups();
  }

  sendCheckRequest() {
    if (this._dependecies.mainApi) {
      const { getUserData } = this._dependecies.mainApi;

      getUserData()
        .then((result) => {
          if (result.name && result.email) {
            this._userName = result.name;
            this._setAuthorizedComponents();
          } else {
            throw new Error('Unauthorized');
          }
        })
        .catch(() => {
          this._setUnauthorizedComponents();
        });
    }
  }
}
