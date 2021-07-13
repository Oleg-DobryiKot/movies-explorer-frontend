import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Login.css';
import logo from '../../../images/logo/logo.svg';
import { TooltipContext } from '../../../contexts/TooltipContext';
import { useFormWithValidation } from '../restFormValidation';

export default function Login({ onLogin }) {
 
  const initialData = { password: '', email: '' };
  // const [data, setData] = useState(initialData);
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation(initialData);
  const { setMessage } = useContext(TooltipContext);
  const history = useHistory();

  // const handleChange = (event) => {
  //   const {name, value} = event.target;
  //   setData(data => ({
  //     ...data,
  //     [name]: value,
  //   }));
  // }

  // const resetForm = () => {
  //   setData(initialData);
  // }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // if (!data.email) {
    //   setMessage({ type: 'error', text: 'Не введен email!' });
    //   return;
    // }
    // if (!data.password) {
    //   setMessage({ type: 'error', text: 'Не введен пароль!' });
    //   return;
    // }
    if (!isValid) {
      return;
    }

    onLogin(values)
      .then(() => {
        setMessage({ type: 'info', text: 'Поздравляем, логин успешный!' });
        resetForm();
        history.push('/movies');
      })
      .catch(err => setMessage({
        type: 'error',
        text: err.message || 'Что-то пошло не так!'
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
          <div className="login__button-container">
            <button type="submit" className="login__button-submit"  disabled={ !isValid } onSubmit={ handleSubmit } >Войти</button>
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

