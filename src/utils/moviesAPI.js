class MoviesApi {
  constructor(login) {
    this._server = login.server;
    this._path = `${this._server}`;
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
    });
    return this._handleResponse(request);
  }
}

const login = {
  "server": "https://api.nomoreparties.co",
}

const moviesApi = new MoviesApi(login);
export default moviesApi;