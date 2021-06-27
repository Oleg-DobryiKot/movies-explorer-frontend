import 'react-dom';
import SearchForm from './SearchForm/SearchForm';
import MovieCardList from './MoviesCardList/MovieCardList';

function Movies() {

  return (
    <section className="movies">
      <SearchForm/>
      <MovieCardList/>
    </section>
  )
}
  
export default Movies;