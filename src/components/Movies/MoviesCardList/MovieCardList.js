import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import Preloader from '../Preloader/Preloader';
import { movieCards, movieSavedCards } from '../../../utils/MovieCards';
import './MovieCardList.css';

function MovieCardList({onCardClick, onCardLike, onCardDelete}) {
  const location = useLocation();
  const [cardlist, setCardList] = useState(movieCards); 
  const [showMore, setShowMore] = useState(false); 

  useEffect(() => {
    (location.pathname === "/movies") ? setCardList(movieCards) : setCardList(movieSavedCards);
    (location.pathname === "/movies") ? setShowMore(true) : setShowMore(false);
   }, [location]);

  return (
      <section className="movie-cards">
        {/* <Preloader/> */}
        <div className="movie-cards__container">       
        {cardlist.map((card) => (
          <MovieCard 
            key={ card._id }
            { ...card } 
            // onCardClick={ onCardClick } 
            // onCardLike={ onCardLike }
            // onCardDelete={ onCardDelete }
          />
          )
        )}
        </div>
        {
          showMore && 
          <div className="movie-cards__button-container">
            <button type="button" className="movie-cards__button-more">Еще...</button>
          </div>
        }
      </section>
  )
}
  
export default MovieCardList;