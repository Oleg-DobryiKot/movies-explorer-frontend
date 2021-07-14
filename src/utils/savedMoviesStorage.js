const SAVED_MOVIES_STORAGE_KEY = 'myfilms';

export function getLocalSavedMovies() {
  return JSON.parse(localStorage.getItem(SAVED_MOVIES_STORAGE_KEY)) || [];
};

export function removeLocalSavedMovies() {
  localStorage.removeItem(SAVED_MOVIES_STORAGE_KEY);
}

export function setLocalSavedMovies(savedMovies) {
  localStorage.setItem(SAVED_MOVIES_STORAGE_KEY, JSON.stringify(savedMovies));
};

export function getLocalSavedMovieByMovieId(movieId) {
  const savedMovies = getLocalSavedMovies();
  return savedMovies.find((savedMovie) => savedMovie.movieId === movieId.toString());
};

export function addLocalSavedMovie(savedMovie) {
  setLocalSavedMovies([ ...getLocalSavedMovies(), savedMovie ]);
};

export function removeLocalSavedMovieById(id) {
  setLocalSavedMovies(getLocalSavedMovies().filter(movie => movie._id !== id));
};

export function setLikedStatusToMovies(movies) {
  const savedMovies = getLocalSavedMovies();
  
  return movies.map((movie) => ({
    ...movie, 
    isLiked: savedMovies.some((savedMovie) => savedMovie.movieId === movie.id.toString()),
  }));
};