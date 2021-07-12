import MovieCard from '../MovieCard/MovieCard';
import './MovieCardList.css';

function MovieCardList({cardlist, getCardKey, onCardClick, setMovieLike}) {
  
  return (
      <section className="movie-cards">
        <div className="movie-cards__container">       
        {cardlist.map((card) => (
          <MovieCard 
            key={ getCardKey(card) }
            card={ card }
            // onCardClick={ onCardClick } 
            setMovieLike={ isLiked => setMovieLike(card, isLiked) }
          />
          )
        )}
        </div>
      </section>
  )
}
  
export default MovieCardList;