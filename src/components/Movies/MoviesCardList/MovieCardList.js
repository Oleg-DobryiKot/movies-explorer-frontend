import MovieCard from '../MovieCard/MovieCard';
import './MovieCardList.css';

function MovieCardList({cardlist, onCardClick, onCardLike, onCardDelete}) {

  return (
      <section className="movie-cards">
        <div className="movie-cards__container">       
        {cardlist.map((card) => (
          <MovieCard 
            key={ card.id }
            card={ card }
            // { ...card } 
            // onCardClick={ onCardClick } 
            // onCardLike={ onCardLike }
            // onCardDelete={ onCardDelete }
          />
          )
        )}
        </div>
      </section>
  )
}
  
export default MovieCardList;