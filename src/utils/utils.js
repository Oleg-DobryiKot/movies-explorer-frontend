import {
  MOVIE_COUNT_SMALL, MOVIE_COUNT_MEDIUM, MOVIE_COUNT_LARGE, MOVIE_COUNT_EXTRALARGE, 
  MOVIES_ADD_ON_SCREEN_SMALL, MOVIES_ADD_ON_SCREEN_MEDIUM, MOVIES_ADD_ON_SCREEN_LARGE, MOVIES_ADD_ON_SCREEN_EXTRALARGE, 
} from '../constants/movies-const';

export function getMovieCountOnScreen() {
  return getCountDependsOnScreenResolution(
    MOVIE_COUNT_SMALL, 
    MOVIE_COUNT_MEDIUM, 
    MOVIE_COUNT_LARGE, 
    MOVIE_COUNT_EXTRALARGE,
  );
}

export function getMovieCountMore() {
  return getCountDependsOnScreenResolution(
    MOVIES_ADD_ON_SCREEN_SMALL, 
    MOVIES_ADD_ON_SCREEN_MEDIUM, 
    MOVIES_ADD_ON_SCREEN_LARGE, 
    MOVIES_ADD_ON_SCREEN_EXTRALARGE,
  );
}

function getCountDependsOnScreenResolution(
  small,
  medium,
  large,
  extraLarge
) {
  if (window.matchMedia("(max-width: 480px)").matches) {
    return small;
  } else if (window.matchMedia("(max-width: 768px)").matches) {
    return medium; 
  } else if (window.matchMedia("(max-width: 1200px)").matches) {
    return large; 
  }
  return extraLarge; 
}

export function getFormatedTimeFromMins(minuts) {
  const hours = Math.trunc(minuts/60);
  const minutes = minuts % 60;
  return hours + 'ч  ' + minutes + 'м';
};