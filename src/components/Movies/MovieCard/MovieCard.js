import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MovieCard.css';
import { getFormatedTimeFromMins } from '../../../utils/utils';

const DEFAULT_MOVIES_PATH = 'https://api.nomoreparties.co';

function MovieCard({onCardClick, onCardAddLike, onCardDeleteDislike, card, isSaved }) {
    // const {id, nameRU, nameEN, country, description, director, duration, trailerLink, year, image, } = card;
    // const {url, formats,} = image;
    // const { thumbnailUrl = url } = formats.thumbnail.url;
  const PATH_IMG = !isSaved ? DEFAULT_MOVIES_PATH+card.image.url : card.image;
  const [isLiked, setIsLiked] = useState(false); 
  const location = useLocation();
  const [showDelete, setShowDelete] = useState(false); 
  
  const cardLikeButtonClassName = (
    `movie-card__like-icon ${isLiked ? 'movie-card__like-icon_active' : ''}`); 

  useEffect(() => {
    (location.pathname === "/movies") ? setShowDelete(false) : setShowDelete(true);
  }, [location]);
    
  // function handleClick() {
  //   onCardClick({ url, nameRU });
  // }

  // function handleLikeClick() {
  //   if (!isLiked) {
  //     setIsLiked(true);
  //     return;
  //   }
  //   setIsLiked(false);
  // }
  
  function handleDeleteClick() {
    onCardDeleteDislike(card._id);
  }

  return (
    <div className="movie-card">
      <img 
        className="movie-card__image"
        src={ PATH_IMG }
        alt={ card.nameRU }
        // onClick={ handleClick }
      />
      <div className="movie-card__description">
        <h3 className="movie-card__title">{ card.nameRU }</h3>
        {/* todo:
              make one button with different class depended from state
              and owner
         */}
        {!showDelete &&
          <button  
            type="button" 
            className={ cardLikeButtonClassName }
            onClick={ onCardAddLike }
          >
          </button>
        }
        {showDelete &&
          <button  
            type="button" 
            className="movie-card__delete-btn"
            onClick={ handleDeleteClick }
          >
          </button>
        }
      </div>
      <div className="movie-card__duration">{ getFormatedTimeFromMins(card.duration) }</div>
    </div>
  )
}

export default MovieCard;