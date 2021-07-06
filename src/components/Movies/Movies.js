import 'react-dom';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState, useMemo } from 'react';
import Preloader from './Preloader/Preloader';
import { movieCards, movieSavedCards } from '../../utils/MovieCards';
import ListModel from '../../utils/ListModel';
import { getMovieCountOnScreen } from '../../utils/utils';


import SearchForm from './SearchForm/SearchForm';
import MovieCardList from './MoviesCardList/MovieCardList';
import MovieMore from './MovieMore/MovieMore';

const DEFAULT_MOVIES_LENGTH = 5;

function fetchSimulate(list) {
  return new Promise(res => {
    setTimeout(() => {
      res(list);
    }, 3000);
  });
}

function Movies() {
  const moviesListModel = useMemo(
    () => new ListModel([], DEFAULT_MOVIES_LENGTH),
    [],
  );

  const location = useLocation();
  const [cardList, setCardList] = useState(moviesListModel.viewList); 
  const [showMore, setShowMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return moviesListModel.onViewListChange(updatedList => {
      setCardList(updatedList);
      setShowMore(moviesListModel.canShowMore);
    });
  }, []);

  useEffect(() => {
    if (location.pathname === "/movies") {
      setIsLoading(true);
      fetchSimulate(movieCards)
        .then((cards) => {
          moviesListModel.updateInitialList(cards);
        })
        .catch()
        .finally(() => setIsLoading(false));

    } else if (location.pathname === "/saved-movies") {
      moviesListModel.updateInitialList(movieSavedCards);
    } else {
      moviesListModel.updateInitialList([]);
    }
  }, [location]);

  function showMoreMovies() {
    moviesListModel.showMore(getMovieCountOnScreen());
  }  

  function onSearch(search) {
    if (!search) {
      moviesListModel.setSearchFn(null);
    } else {
      moviesListModel.setSearchFn(item => {
        return item.name.toLowerCase().includes(search.toLowerCase());
      });
    }
  }

  function onShortFilmsChecked(checked) {
    if (!checked) {
      moviesListModel.setFilterFn(null);
    } else {
      moviesListModel.setFilterFn(item => {
        // item.duration < 1000
        return item.duration < 160;
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