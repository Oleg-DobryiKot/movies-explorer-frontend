class Api {
  constructor(login) {
    this._server = login.server;
    this._auth = ''; //login.auth;
    // this._cohort = login.cohort;
    // this._path = `${this._server}${this._cohort}`;
  }

  _handleResponse(request) {
    return request.then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getInitialMovies() {
    const request = fetch(`${this._path}/beatfilm-movies`, {
      method: 'GET',
      headers: {
        authorization: this._auth
      }
    });
    return this._handleResponse(request);
  }
}

const login = {
  "server": "https://api.nomoreparties.co",
  "auth": "ca5f4285-decb-4fbb-b094-52f199996ef3",
  "cohort": "cohort-19"
}

const api = new Api(login);
export default api;