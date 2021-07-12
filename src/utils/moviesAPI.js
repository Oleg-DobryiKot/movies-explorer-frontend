const MOVIES_API_PATH = 'https://api.nomoreparties.co';

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

  static convertMovieToSavedMovie(movie) {
    return {
      'country': movie.country,
      'director': movie.director, 
      'duration': movie.duration,
      'year': movie.year,
      'description': movie.description,
      'image': MOVIES_API_PATH+movie.image.url,
      'trailer': movie.trailerLink,
      'thumbnail': MOVIES_API_PATH+movie.image.formats.thumbnail.url,
      'movieId': movie.id.toString(),
      'nameRU': movie.nameRU,
      'nameEN': movie.nameEN,
    }
  }
}

const login = {
  "server": MOVIES_API_PATH,
}

export const moviesApi = new MoviesApi(login);

export function convertMovieToSavedMovie(movie) {
  return {
    'country': movie.country,
    'director': movie.director, 
    'duration': movie.duration,
    'year': movie.year,
    'description': movie.description,
    'image': MOVIES_API_PATH+movie.image.url,
    'trailer': movie.trailerLink,
    'thumbnail': MOVIES_API_PATH+movie.image.formats.thumbnail.url,
    'movieId': movie.id.toString(),
    'nameRU': movie.nameRU,
    'nameEN': movie.nameEN,
  }
}