export function getMovieCountOnScreen() {
  if (window.matchMedia("(max-width: 480px)").matches) {
    return 5;
  } else if (window.matchMedia("(max-width: 768px)").matches) {
    return 8;
  } else if (window.matchMedia("(max-width: 1200px)").matches) {
    return 12;
  }
  return 16;
}

export function getMovieCountMore() {
  if (window.matchMedia("(max-width: 480px)").matches) {
    return 2;
  } else if (window.matchMedia("(max-width: 768px)").matches) {
    return 2; 
  } else if (window.matchMedia("(max-width: 1200px)").matches) {
    return 3; 
  }
  return 4; 
}
