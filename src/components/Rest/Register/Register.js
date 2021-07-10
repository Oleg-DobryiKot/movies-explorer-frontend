import React, { useState, useEffect, useContext } from 'react';
import { ErrorMessageContext } from '../../../contexts/ErrorMessageContext';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../../images/logo/logo.svg';
import './Register.css';

export default function Register({ onRegister, onShowTooltip }) {
  const initialData = {
    password: '',
    email: '',
    name: ''
  };

  const [data, setData] = useState(initialData);
  const { message, setErrorMessage } = useContext(ErrorMessageContext);
  const history = useHistory();
  
  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      history.push('/movies');
    }
  },[history]);

  const handleChange = (event) => {
    const {name, value} = event.target;
    setData(data => ({
      ...data,
      [name]: value,
    }));
  }

  const resetForm = () => {
    setData(initialData);
    setErrorMessage('');
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!data.name || !data.email || !data.password) {
        onShowTooltip();
        return;
      }

    onRegister(data)
      .then(() => {
        onShowTooltip()
      })
      .then(resetForm)
      .then(() => history.push('/signin'))
      .catch(err => setErrorMessage(err.message || 'Что-то пошло не так!'));
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
          <label className="register__label">Имя</label>  {/* value={data.name} */}
          <input className="register__input" required id="username" name="name" type="text" placeholder="Олег" value={data.name} onChange={ handleChange } />
          <span className="register__error">Имя нужно заполнить!</span>
        </fieldset>
        <fieldset className="register__field">
          <label className="register__label">E-mail</label>
          <input className="register__input" required id="email" name="email" type="email" placeholder="Email:" value={data.email} onChange={ handleChange } />
          <span className="register__error register__error_visible">Тут должен быть валидный email</span>
        </fieldset>
        <fieldset className="register__field">
          <label className="register__label">Пароль</label>
          <input className="register__input" required id="password" name="password" type="password" placeholder="Пароль:" value={data.password} onChange={ handleChange } />
          <span className="register__error">Что-то пошло не так</span>
        </fieldset>
        <div className="register__button-container">
            <button onSubmit={ handleSubmit } type="submit" className="register__button-submit">Зарегистрироваться</button>
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