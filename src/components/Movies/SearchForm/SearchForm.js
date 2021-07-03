import './SearchForm.css';

function SearchForm() {
  const data = {
    movieName: ''
  };

  return (
    <div className="search">
      <form className="search__form">
        <fieldset className="search__field">
          <input className="search__input" id="moviename" name="searchmovie" type="text" placeholder="Фильм" defaultValue={data.movieName} />
          <button className="search__btn"></button>
        </fieldset>
        <fieldset className="search__field">
          <label className="search__checkbox">
	          <input type="checkbox" defaultChecked />
	          <span className="search__checkbox-switch"></span>
          </label>
          <span className="search_chk-text">Короткометражки</span>
        </fieldset>
      </form>
    </div>  
  )
}

export default SearchForm;