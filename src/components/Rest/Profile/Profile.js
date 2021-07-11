import React from 'react';
import { useState, useEffect, useContext } from 'react';
import 'react-dom';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
import './Profile.css';
import EditProfilePopup from '../../Markup/Popups/EditProfilePopup/EditProfilePopup';
import mainApi from '../../../utils/mainApi';

export default function Profile({ onLoggedOut }) {
  debugger;
  const { user, setUser } = useContext(CurrentUserContext);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  // console.log(currentUser);
  // debugger;

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function closeEditProfilePopup() {
    setIsEditProfilePopupOpen(false);
  }

  function handleUpdateUser(userData) {
    debugger;
    const authToken = localStorage.getItem('jwt');
    mainApi.sendUserInfo(userData, authToken)
      .then((user) => {
        debugger;
        setUser(user);
      })
      .catch(console.error);
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

