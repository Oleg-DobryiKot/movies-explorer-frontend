class MainApi {
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

  getSavedMovies(authToken) {
    const request = fetch(`${this._path}/movies`, {
      method: 'GET',
      'credentials': 'include',
      headers: {
        authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    return this._handleResponse(request);
  }

  getUserInfo(authToken) {
    const request = fetch(`${this._path}/users/me`, {
      method: 'GET',
      'credentials': 'include',
      headers: {
        authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    })
    return this._handleResponse(request);
  }

  sendUserInfo(data, authToken) {
    const request = fetch(`${this._path}/users/me`, {
      method: 'PATCH',
      'credentials': 'include',
      headers: {
        authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      })
    })
    return this._handleResponse(request);
  }

  addMovie(data, authToken) {
    const request = fetch(`${this._path}/movies`, {
      method: 'POST',
      'credentials': 'include',
      headers: {
        authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    return this._handleResponse(request);
  }

  deleteMovie(movieId, authToken) {
    const request = fetch(`${this._path}/movies/${movieId}`, {
      method: 'DELETE',
      'credentials': 'include',
      headers: {
        authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
    })
    return this._handleResponse(request);
  }
}

const login = {
  // "server": "http://localhost:3030",
  "server": "https://api.matveev-oleg.nomoredomains.club",  
}
const mainApi = new MainApi(login);
export default mainApi;