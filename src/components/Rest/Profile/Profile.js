import React from 'react';
import './Profile.css';

export default function Profile() {
 
  const userData = {
    name: 'Олег Матвеев',
    email: 'ip-soft@yandex.ru'
  }

  return(
    <div className="profile">
      <p className="profile__welcome">
          Привет! {userData.name}
      </p>
      <div className="profile__account">
        <div className="profile__account-field">
          <p className="profile__account-field_name">Имя</p>
          <p className="profile__account-field_data">{ userData.name }</p>
        </div>
        <div className="profile__account-field">
          <p className="profile__account-field_name">Email</p>
          <p className="profile__account-field_data">{ userData.email }</p>
        </div>
        <p className="profile__edit"> Редактировать </p>  
        <p className="profile__logout"> Выйти из аккаунта</p>      
      </div>
    </div>
    )
}

