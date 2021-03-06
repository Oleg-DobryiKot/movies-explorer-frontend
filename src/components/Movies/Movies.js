import 'react-dom';
import React, { useEffect, useState, useMemo, useContext } from 'react';
import Preloader from './Preloader/Preloader';
import ListModel from '../../utils/ListModel';
import { getMovieCountOnScreen, getMovieCountMore } from '../../utils/utils';
import { moviesApi, convertMovieToSavedMovie } from '../../utils/moviesAPI';
import mainApi from '../../utils/mainApi';
import { setLocalMovies, getLocalMovies } from '../../utils/moviesStorage';
import { setLikedStatusToMovies, removeLocalSavedMovieById, setLocalSavedMovies, getLocalSavedMovieByMovieId, addLocalSavedMovie } from '../../utils/savedMoviesStorage';
import { TooltipContext } from '../../contexts/TooltipContext';
import { SHORT_FILM_DURATION } from '../../constants/movies-const';
import SearchForm from './SearchForm/SearchForm';
import MovieCardList from './MoviesCardList/MovieCardList';
import MovieMore from './MovieMore/MovieMore';

const emptySearchFn = () => false;
const createSearchFn = (searchReq) => {
  if (!searchReq) {
    return emptySearchFn;
  }
  return item => { 
    return item.nameRU.toLowerCase().includes(searchReq.toLowerCase());
  }
}

function Movies() {
  const initSearch = useMemo(() => localStorage.getItem('searchRequest'), []);

  const moviesListModel = useMemo(
    () => {
      const listModel = new ListModel([], getMovieCountOnScreen());
      listModel.setSearchFn(createSearchFn(initSearch));
      return listModel;
    },
    [],
  );

  const [cardList, setCardList] = useState(moviesListModel.viewList); 
  const [showMore, setShowMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setMessage } = useContext(TooltipContext);

  useEffect(() => {
    loadMovies();
    return moviesListModel.onViewListChange(updatedList => {
      setCardList(updatedList);
      setShowMore(moviesListModel.canShowMore);      
    });
  }, []);

  function loadMovies() {
    setIsLoading(true);
    const authToken = localStorage.getItem('jwt');

    Promise.all([
      moviesApi.getInitialMovies(),
      mainApi.getSavedMovies(authToken),
    ])
      .then(([ movies, savedMovies ]) => {
        const savedMoviesModel = savedMovies
          .map((savedModel) => ({
          ...savedModel,
          canDelete: true,
        }));
        setLocalSavedMovies(savedMoviesModel);
        
        const likedMoviesModel = setLikedStatusToMovies(movies);
        setLocalMovies(likedMoviesModel);
        
        moviesListModel.updateInitialList(likedMoviesModel);
      })
      .catch(() => {
        setMessage({ type: 'error', text: '???????????????? ???????????? ???? ????????????????. ???????????????????? ?????????????????? ???????????? ??????????!' });
      })
      .finally(() => setIsLoading(false));
  }

  function showMoreMovies() {
    moviesListModel.showMore(getMovieCountMore());
  }  

  function onSearch(search) {
    if (!search) {
      setMessage({ type: 'error', text: '???????????????????? ???????????? ?????????????????? ????????????!' });
      moviesListModel.setSearchFn(emptySearchFn);
    } else {
      moviesListModel.setSearchFn(createSearchFn(search));
      }
      if (!getLocalMovies().length) {
        loadMovies();
      } else {
        moviesListModel.updateInitialList(getLocalMovies());
        if (!moviesListModel.viewList.length) {
          setMessage({ type: 'info', text: '?????? ?????????????????????? ?????????????? ??????????????!' });
        }
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
          setMessage({ type: 'error', text: '???????????? ?????????? ???? ?????????????????????????? ?????????? ????????????!' });
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
        .catch(() => {
          setMessage({ type: 'error', text: '?????? ???????????????????? ?????????? ?????????????????? ???????????? ???? ??????????????.' });
          console.error()}
        );
    }
  } 

  return (
    <section className="movies">
      <SearchForm
        initSearch={ initSearch || '' }
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