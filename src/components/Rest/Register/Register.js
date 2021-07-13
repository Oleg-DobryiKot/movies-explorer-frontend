import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../../images/logo/logo.svg';
import './Register.css';
import { TooltipContext } from '../../../contexts/TooltipContext';
import { useFormWithValidation } from '../restFormValidation';

export default function Register({ onRegister }) {
  const initialData = {
    password: '',
    email: '',
    name: ''
  };

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

  // const resetForm = () => setData(initialData);

  const handleSubmit = (event) => {
    event.preventDefault();
    // if (!values.name) {
    //   setMessage({ type: 'error', text: 'Не введено имя!' });
    //   return;
    // }
    // if (!values.email) {
    //   setMessage({ type: 'error', text: 'Не введен email!' });
    //   return;
    // }
    // if (!values.password) {
    //   setMessage({ type: 'error', text: 'Не введен пароль!' });
    //   return;
    // }
    // debugger;
    if (!isValid) {
      return;
    }

    onRegister(values)
      .then(() => {
        setMessage({ type: 'info', text: 'Вы успешно зарегестрировались!' });
        resetForm();
        history.push('/movies');
      })
      .catch(err => setMessage({
        type: 'error',
        text: err.message || 'Что-то пошло не так!'
      }));
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
        <div className="register__button-container">
            <button onSubmit={ handleSubmit } type="submit" disabled={ !isValid } className="register__button-submit">Зарегистрироваться</button>
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