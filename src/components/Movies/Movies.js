import 'react-dom';
import React, { useEffect, useState, useMemo } from 'react';
import Preloader from './Preloader/Preloader';
import ListModel from '../../utils/ListModel';
import { getMovieCountOnScreen, getMovieCountMore } from '../../utils/utils';
import { moviesApi, convertMovieToSavedMovie } from '../../utils/moviesAPI';
import mainApi from '../../utils/mainApi';
import { getLocalMovies, setLocalMovies } from '../../utils/moviesStorage';
import { setLikedStatusToMovies, removeLocalSavedMovieById, setLocalSavedMovies, getLocalSavedMovieByMovieId, addLocalSavedMovie } from '../../utils/savedMoviesStorage';

import SearchForm from './SearchForm/SearchForm';
import MovieCardList from './MoviesCardList/MovieCardList';
import MovieMore from './MovieMore/MovieMore';

const emptySearchFn = () => false;

function Movies() {
  const moviesListModel = useMemo(
    () => {
      const listModel = new ListModel([], getMovieCountOnScreen());
      listModel.setSearchFn(emptySearchFn);
      return listModel;
    },
    [],
  );

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
    setIsLoading(true);
    moviesListModel.setSearchFn(emptySearchFn);
    moviesListModel.updateInitialList(getLocalMovies());
    const authToken = localStorage.getItem('jwt');

    Promise.all([
      moviesApi.getInitialMovies(),
      mainApi.getSavedMovies(authToken),
    ])
      .then(([ movies, savedMovies ]) => {
        setLocalSavedMovies(savedMovies);
        const likedMoviesModel = setLikedStatusToMovies(movies);
        setLocalMovies(likedMoviesModel);
        
        moviesListModel.updateInitialList(likedMoviesModel);
      })
      .catch()
      .finally(() => setIsLoading(false));
  }, []);

  function showMoreMovies() {
    moviesListModel.showMore(getMovieCountMore());
  }  

  function onSearch(search) {
    if (!search) {
      moviesListModel.setSearchFn(emptySearchFn);
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

  function setMovieLike(movie, isLiked) {
    const authToken = localStorage.getItem('jwt');

    if (isLiked) {
      const savedMovieModel = convertMovieToSavedMovie(movie);

      mainApi.addMovie(savedMovieModel, authToken)
        .then((savedMovie) => {
          addLocalSavedMovie(savedMovie);
          moviesListModel.changeItem(
            ({ id }) => id === movie.id,
            {
              ...movie,
              isLiked: true,
            },
          );
          setLocalMovies(moviesListModel.getFullList());
        })
        .catch((err) => {
          console.error(err);
        });
    } else {

      const movieToDelete = getLocalSavedMovieByMovieId(movie.id);
      mainApi.deleteMovie(movieToDelete._id, authToken)
        .then(() => {
          removeLocalSavedMovieById(movieToDelete._id);
          moviesListModel.changeItem(
            ({ id }) => id === movie.id,
            {
              ...movie,
              isLiked: false,
            },
          );
          setLocalMovies(moviesListModel.getFullList());
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
        getCardKey={ card => card.id.toString() }
        setMovieLike={ setMovieLike }
      />
      { showMore && <MovieMore onShowMore={ showMoreMovies } /> }
    </section>
  )
}
  
export default Movies;