export function getMovieCountOnScreen() {
  return getCountDependsOnScreenResolution(5, 8, 12, 16);
}

export function getMovieCountMore() {
  return getCountDependsOnScreenResolution(2, 2, 3, 4);
}

function getCountDependsOnScreenResolution(
  small,
  medium,
  large,
  defaultCount
) {
  if (window.matchMedia("(max-width: 480px)").matches) {
    return small;
  } else if (window.matchMedia("(max-width: 768px)").matches) {
    return medium; 
  } else if (window.matchMedia("(max-width: 1200px)").matches) {
    return large; 
  }
  return defaultCount; 
}
