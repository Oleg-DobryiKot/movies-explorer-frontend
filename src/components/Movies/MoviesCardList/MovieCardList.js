import MovieCard from '../MovieCard/MovieCard';
import './MovieCardList.css';

function MovieCardList({cardlist, getCardKey, setMovieLike}) {
  
  return (
    <section className="movie-cards">
      <div className="movie-cards__container">       
      {cardlist.map((card) => (
        <MovieCard 
          key={ getCardKey(card) }
          card={ card }
          setMovieLike={ isLiked => setMovieLike(card, isLiked) }
        />
        )
      )}
      </div>
    </section>
  )
}
  
export default MovieCardList;