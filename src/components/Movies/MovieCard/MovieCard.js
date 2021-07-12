import React from 'react';
import './MovieCard.css';
import { getFormatedTimeFromMins } from '../../../utils/utils';

const DEFAULT_MOVIES_PATH = 'https://api.nomoreparties.co';

function getCardImage(card) {
  if (card.canDelete) {
    return card.image;
  } 
  return DEFAULT_MOVIES_PATH+card.image.url;
}

function MovieCard({onCardClick, setMovieLike, card }) {
  const PATH_IMG = getCardImage(card);

  // function handleClick() {
  //   onCardClick({ url, nameRU });
  // }

  function handleLikeClick() {
    if (card.canDelete || card.isLiked) {
      setMovieLike(false);
    } else {
      setMovieLike(true);
    }
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
        {!card.canDelete &&
          <button  
            type="button" 
            className={ `movie-card__like-icon ${card.isLiked ? 'movie-card__like-icon_active' : ''}` }
            onClick={ handleLikeClick }
          >
          </button>
        }
        {card.canDelete &&
          <button  
            type="button" 
            className="movie-card__delete-btn"
            onClick={ handleLikeClick }
          >
          </button>
        }
      </div>
      <div className="movie-card__duration">{ getFormatedTimeFromMins(card.duration) }</div>
    </div>
  )
}

export default MovieCard;