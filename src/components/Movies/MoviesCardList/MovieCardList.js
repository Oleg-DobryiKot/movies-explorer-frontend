import MovieCard from '../MovieCard/MovieCard';
import './MovieCardList.css';

function MovieCardList({cardlist, isSaved, onCardClick, onCardAddLike, onCardDeleteDislike}) {
  
  return (
      <section className="movie-cards">
        <div className="movie-cards__container">       
        {cardlist.map((card) => (
          <MovieCard 
            key={!isSaved ? card.id : card._id }
            card={ card }
            isSaved={ isSaved }
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