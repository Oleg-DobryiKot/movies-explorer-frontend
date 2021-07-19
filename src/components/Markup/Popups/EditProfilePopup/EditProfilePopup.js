import React from 'react';
import PopupForm from '../PopupForm/PopupForm';
import { useEffect, useContext } from 'react';
import 'react-dom';
import { CurrentUserContext } from '../../../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../../Rest/restFormValidation';

import './EditProfilePopup.css';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const { user, setUser } = useContext(CurrentUserContext);
  const initialData = {
    email: user.email,
    name: user.name,
  };

  const { values, handleChange, errors, isValid, isChanged } = useFormWithValidation(initialData);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) {
      return;
    }
    onUpdateUser(values);
  }

  useEffect(() => {
    setUser(values);
  }, [user]); 

  return (
    <PopupForm
      name="profile"
      title="Редактировать профиль"
      isOpen={ isOpen }
      isValid={ isValid }
      isChanged={ isChanged }
      onClose={ onClose }
      onSubmit={ handleSubmit }
    >
    <input
      type="text"
      value={ values.name }
      onChange={ handleChange }
      placeholder="Имя"
      name="name"
      className="popup__input-text"
      minLength="2"
      maxLength="40"
      required
    />
    <span className={`popup__error ${ errors.name ? ' popup__error_visible' : '' }`}>Введите имя</span>
    <input
      type="email"
      value={ values.email }
      onChange={ handleChange }
      placeholder="E-mail"
      name="email"
      className="popup__input-text"
      required
    />
    <span className={`popup__error ${ errors.email ? ' popup__error_visible' : '' }`}>Введите Email</span>
  </PopupForm>
  );
}

export default EditProfilePopup;