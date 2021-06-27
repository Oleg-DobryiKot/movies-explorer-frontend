import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MovieCard.css';

function MovieCard({onCardClick, onCardLike, link, name, duration }) {

  const [isLiked, setIsLiked] = useState(false); 
  const location = useLocation();
  const [showDelete, setShowDelete] = useState(false); 
  
  const cardLikeButtonClassName = (
    `movie-card__like-icon ${isLiked ? 'movie-card__like-icon_active' : ''}`); 

  useEffect(() => {
    (location.pathname === "/movies") ? setShowDelete(false) : setShowDelete(true);
  }, [location]);
    
  function handleClick() {
    onCardClick({link, name});
  }

  function handleLikeClick() {
    if (!isLiked) {
      setIsLiked(true);
      return;
    }
    setIsLiked(false);
  }

  return (
    <div className="movie-card">
      <img 
        className="movie-card__image"
        src={ link }
        alt={ name }
        onClick={ handleClick }
      />
      <div className="movie-card__description">
        <h3 className="movie-card__title">{ name }</h3>
        {/* todo:
              make one button with different class depended from state
              and owner
         */}
        {!showDelete &&
          <button  
            type="button" 
            className={ cardLikeButtonClassName }
            onClick={ handleLikeClick }
          >
          </button>
        }
        {showDelete &&
          <button  
            type="button" 
            className="movie-card__delete-btn"
          >
          </button>
        }
      </div>
      <div className="movie-card__duration">{ duration }</div>
    </div>
  )
}

export default MovieCard;