import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import logo from '../../../images/logo/logo.svg';

export default function Login() {
 
  const initialData = {
    password: '',
    email: ''
  }
  const [data, setData] = useState(initialData);

  const handleChange = (event) => {
    const {name, value} = event.target;
    setData(data => ({
      ...data,
      [name]: value,
    }));
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
        <form className="login__form">
          <fieldset className="login__field">
            <label className="login__label">E-mail</label>
            <input className="login__input" id="email" name="email" type="email" placeholder="Email:" value={data.email} onChange={ handleChange } />
            <span className="login__error">Тут должен быть валидный email</span>
          </fieldset>
          <fieldset className="login__field">
            <label className="login__label">Пароль</label>
            <input className="login__input" id="password" name="password" type="password" placeholder="Пароль:" value={data.password} onChange={ handleChange } />
            <span className="login__error login__error_visible">Что-то пошло не так</span>
          </fieldset>
          <div className="login__button-container">
            <button type="submit" className="login__button-submit">Войти</button>
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

