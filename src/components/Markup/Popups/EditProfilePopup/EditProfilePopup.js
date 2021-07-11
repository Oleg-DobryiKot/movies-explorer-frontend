import React from 'react';
import PopupForm from '../PopupForm/PopupForm';
import { useState, useEffect, useContext } from 'react';
import 'react-dom';
import { CurrentUserContext } from '../../../../contexts/CurrentUserContext';
import './EditProfilePopup.css';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const currentUser = useContext(CurrentUserContext);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser({
      name: name,
      email: email,
    });
  } 

  useEffect(() => {
    setName(currentUser.name || '');
    setEmail(currentUser.email || '');
  }, [currentUser]); 

  return (
    <PopupForm
      name="profile"
      title="Редактировать профиль"
      isOpen={ isOpen }
      onClose={ onClose }
      onSubmit={ handleSubmit }
    >
    <input
      type="text"
      value={ name }
      onChange={ handleNameChange }
      placeholder="Имя"
      name="name"
      className="popup__input-text"
      minLength="2"
      maxLength="40"
      required
    />
    <span className="popup__error">Введите имя</span>
    <input
      type="email"
      value={ email }
      onChange={ handleEmailChange }
      placeholder="E-mail"
      name="email"
      className="popup__input-text"
      required
    />
    <span className="popup__error">Введите Email</span>
  </PopupForm>
  );
}

export default EditProfilePopup;