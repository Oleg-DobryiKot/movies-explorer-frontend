import 'react-dom';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState, useMemo } from 'react';
import Preloader from './Preloader/Preloader';
// import { movieSavedCards } from '../../utils/MovieCards';
import ListModel from '../../utils/ListModel';
import { getMovieCountOnScreen, getMovieCountMore } from '../../utils/utils';
import moviesApi from '../../utils/moviesAPI';
import mainApi from '../../utils/mainApi';

import SearchForm from './SearchForm/SearchForm';
import MovieCardList from './MoviesCardList/MovieCardList';
import MovieMore from './MovieMore/MovieMore';

// function fetchSimulate(list) {
//   return new Promise(res => {
//     setTimeout(() => {
//       res(list);
//     }, 3000);
//   });
// }

function Movies() {
  const moviesListModel = useMemo(
    () => new ListModel([], getMovieCountOnScreen()),
    [],
  );

  const location = useLocation();
  const [cardList, setCardList] = useState(moviesListModel.viewList); 
  const [showMore, setShowMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const token = '';  

  useEffect(() => {
    return moviesListModel.onViewListChange(updatedList => {
      setCardList(updatedList);
      setShowMore(moviesListModel.canShowMore);
    });
  }, []);

  useEffect(() => {
    if (location.pathname === "/movies") {
      setIsLoading(true);
      moviesApi.getInitialMovies()
        .then((movieCards) => {
          moviesListModel.updateInitialList(movieCards);
        })
        .catch()
        .finally(() => setIsLoading(false));

    } else if (location.pathname === "/saved-movies") {
        setIsLoading(true);
        mainApi.getSavedMovies(token)
          .then((movieSavedCards) => {
            moviesListModel.updateInitialList(movieSavedCards);
          })
          .catch(() => {
            console.error('Произошла ошибка');
            moviesListModel.updateInitialList([]);
          })
          .finally(() => setIsLoading(false));
    } else {
      moviesListModel.updateInitialList([]);
    }
  }, [location]);

  function showMoreMovies() {
    moviesListModel.showMore(getMovieCountMore());
  }  

  function onSearch(search) {
    if (!search) {
      moviesListModel.setSearchFn(null);
    } else {
      moviesListModel.setSearchFn(item => {
        return item.nameRU.toLowerCase().includes(search.toLowerCase());
      });
    }
  }

  function onShortFilmsChecked(checked) {
    if (!checked) {
      moviesListModel.setFilterFn(null);
    } else {
      moviesListModel.setFilterFn(item => {
        return item.duration < 40;
      });
    }
  }

  return (
    <section className="movies">
      <SearchForm 
        onSearch={ onSearch }
        onShortFilmsChecked={ onShortFilmsChecked }
      />
      {isLoading && <Preloader />}
      <MovieCardList cardlist={ cardList }/>
      { showMore && <MovieMore onShowMore={ showMoreMovies } /> }
    </section>
  )
}
  
export default Movies;