import MovieCard from '../MovieCard/MovieCard';
import './MovieCardList.css';

function MovieCardList({cardlist, onCardClick, onCardAddLike, onCardDeleteDislike}) {
  
  return (
      <section className="movie-cards">
        <div className="movie-cards__container">       
        {cardlist.map((card) => (
          <MovieCard 
            key={ card.id }
            card={ card }
            // onCardClick={ onCardClick } 
            onCardAddLike={ onCardAddLike }
            onCardDeleteDislike={ onCardDeleteDislike }
          />
          )
        )}
        </div>
      </section>
  )
}
  
export default MovieCardList;