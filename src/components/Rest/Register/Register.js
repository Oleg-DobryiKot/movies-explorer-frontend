import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../images/logo/logo.svg';
import './Register.css';

export default function Register() {
  const initialData = {
    password: '',
    email: '',
    name: ''
  };

  const [data, setData] = useState(initialData);
  
  const handleChange = (event) => {
    const {name, value} = event.target;
    setData(data => ({
      ...data,
      [name]: value,
    }));
  }

  return (
    <div className="register">
      <p className="register__welcome">
        <Link to="/" >
          <img
            className="register__logo"
            src={ logo }
            alt="Логотип"
          />
        </Link>
        Добро пожаловать!
      </p>

      <form className="register__form">
        <fieldset className="register__field">
          <label className="register__label">Имя</label>
          <input className="register__input" id="username" name="username" type="text" placeholder="Олег" value={data.name} onChange={ handleChange } />
          <span className="register__error">Имя нужно заполнить!</span>
        </fieldset>
        <fieldset className="register__field">
          <label className="register__label">E-mail</label>
          <input className="register__input" id="email" name="email" type="email" placeholder="Email:" value={data.email} onChange={ handleChange } />
          <span className="register__error register__error_visible">Тут должен быть валидный email</span>
        </fieldset>
        <fieldset className="register__field">
          <label className="register__label">Пароль</label>
          <input className="register__input" id="password" name="password" type="password" placeholder="Пароль:" value={data.password} onChange={ handleChange } />
          <span className="register__error">Что-то пошло не так</span>
        </fieldset>
        <div className="register__button-container">
            <button type="submit" className="register__button-submit">Зарегистрироваться</button>
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