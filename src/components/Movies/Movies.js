import 'react-dom';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState, useMemo, useContext } from 'react';
import Preloader from './Preloader/Preloader';
import ListModel from '../../utils/ListModel';
import { getMovieCountOnScreen, getMovieCountMore } from '../../utils/utils';
import moviesApi from '../../utils/moviesAPI';
import mainApi from '../../utils/mainApi';

import SearchForm from './SearchForm/SearchForm';
import MovieCardList from './MoviesCardList/MovieCardList';
import MovieMore from './MovieMore/MovieMore';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const API_PATH = 'https://api.nomoreparties.co';

function Movies() {
  const moviesListModel = useMemo(
    () => new ListModel([], getMovieCountOnScreen()),
    [],
  );

  const location = useLocation();
  const [cardList, setCardList] = useState(moviesListModel.viewList); 
  const [showMore, setShowMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { user } = useContext(CurrentUserContext);
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
      setIsSaved(false);
      const beatfilms = JSON.parse(localStorage.getItem('beatfilms'));
      if (beatfilms) {
        // debugger;
        // console.log(beatfilms);
        moviesListModel.updateInitialList(beatfilms);
      }
      moviesApi.getInitialMovies()
        .then((movieCards) => {
          // debugger;
          moviesListModel.updateInitialList(movieCards);
          // console.log(movieCards);
          localStorage.setItem('beatfilms', JSON.stringify(movieCards));
        })
        .catch()
        .finally(() => setIsLoading(false));

    } else if (location.pathname === "/saved-movies") {
        setIsLoading(true);
        setIsSaved(true);
        const authToken = localStorage.getItem('jwt');
        const myfilms = JSON.parse(localStorage.getItem('myfilms'));
        if (myfilms) {
          moviesListModel.updateInitialList(myfilms);
        }
        mainApi.getSavedMovies(authToken)
          .then((movieSavedCards) => {
            const ownerMovies = movieSavedCards.filter((fil) => fil.owner === user._id);
            moviesListModel.updateInitialList(ownerMovies);
            localStorage.setItem('myfilms', JSON.stringify(ownerMovies));
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

  function handleCardAddLike(movie) {
    // const myfilms = JSON.parse(localStorage.getItem('myfilms'));
    // const isLiked = myfilms.some(item => item.movieId === movie.id);  
    const authToken = localStorage.getItem('jwt');
    const myMovieModel = {
      'country': movie.country,
      'director': movie.director, 
      'duration': movie.duration,
      'year': movie.year,
      'description': movie.description,
      'image': API_PATH+movie.image.url,
      'trailer': movie.trailerLink,
      'thumbnail': API_PATH+movie.image.formats.thumbnail.url,
      'movieId': movie.id.toString(),
      'nameRU': movie.nameRU,
      'nameEN': movie.nameEN,
    }
    mainApi.addMovie(myMovieModel, authToken)
      .then((newMovie) => {
        // const newCards = cards.map(cardItem => cardItem._id === card._id ? newCard : cardItem);
        // setCards(newCards)
        console.log('film added to our base');
      })
      .catch(console.error);
  } 

  function handleCardDeleteDislike(movie) {
    // const isOwner = card.owner === currentUser._id;
    const authToken = localStorage.getItem('jwt');

    mainApi.deleteMovie(movie._id, authToken)
      .then(() => {
        // const newCards = cards.filter(({ _id }) => _id !== card._id);
        // setCards(newCards)
      })
      .catch(console.error);
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
        isSaved={ isSaved }
        onCardAddLike={ handleCardAddLike }
        onCardDeleteDislike={ handleCardDeleteDislike }
      />
      { showMore && <MovieMore onShowMore={ showMoreMovies } /> }
    </section>
  )
}
  
export default Movies;