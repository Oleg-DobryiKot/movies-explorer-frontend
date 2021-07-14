import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../images/logo/logo.svg';
import './Register.css';
import { useFormWithValidation } from '../restFormValidation';
import Preloader from '../../Movies/Preloader/Preloader';

export default function Register({ onRegister }) {
  const initialData = {
    password: '',
    email: '',
    name: ''
  };

  const { values, handleChange, errors, isValid } = useFormWithValidation(initialData);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) {
      return;
    }
    setIsLoading(true);
    onRegister(values)
      .finally(() => {
        setIsLoading(false);
      })
  }

  return (
    <div className="register">
      <p className="register__welcome">
        <Link to="/" className="register__logo_link">
          <img
            className="register__logo"
            src={ logo }
            alt="Логотип"
          />
        </Link>
        Добро пожаловать!
      </p>

      <form className="register__form" onSubmit={ handleSubmit }>
        <fieldset className="register__field">
          <label className="register__label">Имя</label>
          <input className="register__input" required id="username" name="name" type="text" placeholder="Олег" value={values.name} onChange={ handleChange } />
          <span className={`register__error${ errors.name ? ' register__error_visible' : '' }`}>
            { errors.name || '&nbsp;' }
          </span>
        </fieldset>
        <fieldset className="register__field">
          <label className="register__label">E-mail</label>
          <input className="register__input" required id="email" name="email" type="email" placeholder="Email:" value={values.email} onChange={ handleChange } />
          <span className={`register__error${ errors.email ? ' register__error_visible' : '' }`}>
            { errors.email || '&nbsp;' }
          </span>
        </fieldset>
        <fieldset className="register__field">
          <label className="register__label">Пароль</label>
          <input className="register__input" required id="password" name="password" type="password" placeholder="Пароль:" value={values.password} onChange={ handleChange } />
          <span className={`register__error${ errors.password ? ' register__error_visible' : '' }`}>
            { errors.password || '&nbsp;' }
          </span>
        </fieldset>
        {isLoading && <Preloader />}
        <div className="register__button-container">
            <button onSubmit={ handleSubmit } type="submit" disabled={ !isValid || isLoading } className="register__button-submit">Зарегистрироваться</button>
        </div>
      </form>
      <div className="register__signin">
        <p>Уже зарегистрированы? 
          <Link to="/signin" className="register__link">Войти</Link>
        </p>
      </div>
    </div>
  );
}