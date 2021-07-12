import { useRef } from 'react';
import './SearchForm.css';

function SearchForm({ onSearch, onShortFilmsChecked }) {
  const searchRef = useRef(null);

  function onSearchSubmit(event) {
    event.preventDefault();
    onSearch(searchRef.current.value);
  }

  return (
    <div className="search">
      <form className="search__form" onSubmit={ onSearchSubmit }>
        <fieldset className="search__field">
          <input 
            className="search__input" 
            id="moviename" 
            name="searchmovie" 
            type="text" 
            placeholder="Фильм"
            ref={ searchRef }   
             />
          <button 
            type="submit" 
            className="search__btn" 
          ></button>
        </fieldset>
        <fieldset className="search__field">
          <label className="search__checkbox">
	          <input type="checkbox" onChange={ e => onShortFilmsChecked(e.target.checked) } />
	          <span className="search__checkbox-switch"></span>
          </label>
          <span className="search_chk-text">Короткометражки</span>
        </fieldset>
      </form>
    </div>  
  )
}

export default SearchForm;