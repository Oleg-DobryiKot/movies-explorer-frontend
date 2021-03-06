import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Login.css';
import logo from '../../../images/logo/logo.svg';
import { useFormWithValidation } from '../restFormValidation';
import Preloader from '../../Movies/Preloader/Preloader';
export default function Login({ onLogin }) {
 
  const initialData = { password: '', email: '' };
  const { values, handleChange, errors, isValid } = useFormWithValidation(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!isValid) {
      return;
    }

    setIsLoading(true);
    onLogin(values)
      .finally(() => {
        setIsLoading(false);
      });
  }

  return(
    <div className="login">
      <p className="login__welcome">
        <Link to="/" className="login__logo_link">
          <img
            className="login__logo"
            src={ logo }
            alt="Логотип"
          />
        </Link>
        Рады видеть!
      </p>
      <form className="login__form" onSubmit={ handleSubmit } >
        <fieldset className="login__field">
          <label className="login__label">E-mail</label>
          <input className="login__input" id="email" required name="email" type="email" placeholder="Email:" value={values.email} onChange={ handleChange } />
          <span className={`login__error${ errors.email ? ' login__error_visible' : '' }`}>
          { errors.email || '&nbsp;' }
        </span>
        </fieldset>
        <fieldset className="login__field">
          <label className="login__label">Пароль</label>
          <input className="login__input" id="password" required name="password" type="password" placeholder="Пароль:" value={values.password} onChange={ handleChange } />
          <span className={`login__error${ errors.password ? ' login__error_visible' : '' }`}>
            { errors.password || '&nbsp;' }
          </span>
        </fieldset>
        {isLoading && <Preloader />}
        <div className="login__button-container">
          <button type="submit" className="login__button-submit"  disabled={ !isValid || isLoading} onSubmit={ handleSubmit } >Войти</button>
        </div>
      </form>

      <div className="login__signin">
        <p>Ещё не зарегистрированы? 
          <Link to="/signup" className="login__link">Регистрация</Link>
        </p>
      </div>
    </div>
  )
}

