import './MovieMore.css';

function MovieMore({onShowMore}) {

  return (
    <div className="movie-cards__button-container">
      <button 
        type="button" 
        className="movie-cards__button-more"
        onClick={ onShowMore }
      >
        Еще...
      </button>
    </div>
  )
}
  
export default MovieMore;