import logo from '../../../images/logo/logo.svg';
import './Header.css';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {

  //temporary state for changing header-view depends of login  
  const [loggedIn, setLoggedIn] = useState(false); 
  const location = useLocation();
  const [logoClass, setLogoClass] = useState("header__logo"); 

  useEffect(() => {
    (location.pathname === "/signup" || location.pathname === "/signin") ? setLogoClass("header__logo_hide") : setLogoClass("header__logo")  
   }, [location]);

  function handleLogoClick() {
    if (!loggedIn) {
      setLoggedIn(true);
      return;
    }
    setLoggedIn(false);
  }

  return (
    <header className="header">
      <Link to="/" onClick={ handleLogoClick }>
      <img
        className={ logoClass }
        src={ logo }
        alt="Логотип"
      />
      </Link>
      {loggedIn &&
        <nav className="header__mobinav header__navbar header__navbar_sp-between">
          <input className="header__mobinav_check" type="checkbox" id="showmenu"/>
          <label className="header__mobinav_showmenu" for="showmenu">&#9776;</label>
          <label className="header__mobinav_back" for="showmenu"></label>
          <ul className="header__menu header__navbar-movies">
            <li className="header__navbar-links"><Link to="/" className="header__menu_item header__navbar-link">Главная</Link></li>
            <li className="header__navbar-links"><Link to="/movies" className="header__menu_item header__navbar-link">Фильмы</Link></li>
            <li className="header__navbar-links"><Link to="/saved-movies" className="header__menu_item header__navbar-link">Сохраненные фильмы</Link></li>
            <li className="header__navbar-links">
              <Link className="header__menu_item header__navbar-link header__navbar_btnstyle" to="/profile">
                <span>Аккаунт</span>
                <div className="header__navbar-acc_icon"></div>
              </Link>
            </li>
          </ul>
        </nav>
      }

      {!loggedIn &&      
      <ul className="header__navbar">
        <li className="header__navbar-links"><Link to="/signup" className="header__navbar-link">Регистрация</Link></li>
        <li className="header__navbar-btn"><Link className="header__navbar-btn_text" to="/signin">Войти</Link></li>
      </ul>}
    </header>  
  )
}

export default Header;