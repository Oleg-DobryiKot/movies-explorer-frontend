const MOVIES_STORAGE_KEY = 'beatfilms';

export function getLocalMovies() {
  return JSON.parse(localStorage.getItem(MOVIES_STORAGE_KEY)) || [];
};

export function setLocalMovies(savedMovies) {
  localStorage.setItem(MOVIES_STORAGE_KEY, JSON.stringify(savedMovies));
};

export function dislikeLocalMovie(id) {
  const localMovies = getLocalMovies();
  const movieIndex = localMovies.findIndex((movie) => movie.id.toString() === id);

  if (movieIndex < 0) {
    return;
  }
  setLocalMovies([
    ...localMovies.slice(0, movieIndex),
    {
      ...localMovies[movieIndex], 
      isLiked: false,
    },
    ...localMovies.slice(movieIndex + 1)
  ]);
};
