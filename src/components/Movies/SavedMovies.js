import 'react-dom';
import React, { useEffect, useState, useMemo, useContext } from 'react';
import Preloader from './Preloader/Preloader';
import ListModel from '../../utils/ListModel';
import { getMovieCountOnScreen, getMovieCountMore } from '../../utils/utils';
import mainApi from '../../utils/mainApi';
import { getLocalSavedMovies, removeLocalSavedMovieById, setLocalSavedMovies } from '../../utils/savedMoviesStorage';
import { dislikeLocalMovie } from '../../utils/moviesStorage';
import { SHORT_FILM_DURATION } from '../../constants/movies-const';

import SearchForm from './SearchForm/SearchForm';
import MovieCardList from './MoviesCardList/MovieCardList';
import MovieMore from './MovieMore/MovieMore';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function SavedMovies() {
  const moviesListModel = useMemo(
    () => new ListModel([], getMovieCountOnScreen()),
    [],
  );

  const [cardList, setCardList] = useState(moviesListModel.viewList); 
  const [showMore, setShowMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(CurrentUserContext);

  useEffect(() => {
    return moviesListModel.onViewListChange(updatedList => {
      setCardList(updatedList);
      setShowMore(moviesListModel.canShowMore);      
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const authToken = localStorage.getItem('jwt');
    moviesListModel.setSearchFn(null);
    moviesListModel.updateInitialList(getLocalSavedMovies());
    mainApi.getSavedMovies(authToken)
      .then((movieSavedCards) => {
        const savedMovies = movieSavedCards
          .filter((savedCard) => savedCard.owner === user._id)
          .map((savedCard) => ({
            ...savedCard,
            canDelete: true,
          }));

        moviesListModel.updateInitialList(savedMovies);
        setLocalSavedMovies(savedMovies);
      })
      .catch(() => {
        console.error('Произошла ошибка');
        moviesListModel.updateInitialList([]);
      })
      .finally(() => setIsLoading(false));
  }, []);

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
        return item.duration < SHORT_FILM_DURATION;
      });
    }
  }

  function setMovieLike(movie, isLiked) {
    const authToken = localStorage.getItem('jwt');

    if (isLiked) {
      return;
    } else {
      mainApi.deleteMovie(movie._id, authToken)
        .then(() => {
          removeLocalSavedMovieById(movie._id);
          const updatedMovieList = cardList.filter(({ _id }) => _id !== movie._id);
          moviesListModel.updateInitialList(updatedMovieList);
          dislikeLocalMovie(movie.movieId);
        })
        .catch(console.error);
    }
  } 

  return (
    <section className="movies">
      <SearchForm 
        onSearch={ onSearch }
        onShortFilmsChecked={ onShortFilmsChecked }
      />
      {isLoading && <Preloader />}
      <MovieCardList 
        cardlist={ cardList }
        getCardKey={ card => card._id }
        setMovieLike={ setMovieLike }
      />
      { showMore && <MovieMore onShowMore={ showMoreMovies } /> }
    </section>
  )
}
  
export default SavedMovies;