import { useEffect, useRef } from 'react';
import './SearchForm.css';

function SearchForm({ onSearch, onShortFilmsChecked, initSearch }) {
  const searchRef = useRef(null);

  useEffect(() => searchRef.current.value = initSearch, []);

  function onSearchSubmit(event) {
    const searchRequest = searchRef.current.value;
    event.preventDefault();
    if (searchRequest.length) {
      localStorage.setItem('searchRequest', searchRequest);
    } else {
      localStorage.removeItem('searchRequest');
    }
    onSearch(searchRequest);
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
            placeholder="введите поисковый заброс для отображения подходящих фильмов или пробел -- для всех"
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