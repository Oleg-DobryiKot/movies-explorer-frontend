import React from 'react';
import { useState, useContext } from 'react';
import 'react-dom';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
import { TooltipContext } from '../../../contexts/TooltipContext';

import './Profile.css';
import EditProfilePopup from '../../Markup/Popups/EditProfilePopup/EditProfilePopup';
import mainApi from '../../../utils/mainApi';

export default function Profile({ onLoggedOut }) {
  const { user, setUser } = useContext(CurrentUserContext);
  const { setMessage } = useContext(TooltipContext);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function closeEditProfilePopup() {
    setIsEditProfilePopupOpen(false);
  }

  function handleUpdateUser(userData) {
    const authToken = localStorage.getItem('jwt');
    mainApi.sendUserInfo(userData, authToken)
      .then((user) => {
        setUser(user);
        setMessage({ type: 'info', text: 'Вы успешно изменили свои данные!' });
      })
      .catch(err => setMessage({
        type: 'error',
        text: err.message || 'Что-то пошло не так!'
      }));
    setIsEditProfilePopupOpen(false);
  }

  return(
    <div className="profile">
      <p className="profile__welcome">
          Привет! { user && user.name }
      </p>
      <div className="profile__account">
        <div className="profile__account-field">
          <p className="profile__account-field_name">Имя</p>
          <p className="profile__account-field_data">{ user && user.name }</p>
        </div>
        <div className="profile__account-field">
          <p className="profile__account-field_name">Email</p>
          <p className="profile__account-field_data">{ user && user.email }</p>
        </div>
        <p className="profile__edit" onClick={ handleEditProfileClick }> Редактировать </p>  
        <p className="profile__logout" onClick={ onLoggedOut }> Выйти из аккаунта</p>      
      </div>
      <EditProfilePopup isOpen={ isEditProfilePopupOpen }
        onClose={ closeEditProfilePopup }
        onUpdateUser={ handleUpdateUser } 
      />
    </div>
  )
}

