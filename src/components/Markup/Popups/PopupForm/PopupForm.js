import React from 'react';

import './PopupForm.css';

function PopupForm({title, name, submitText='Сохранить', children, isOpen, isValid, isChanged, onClose, onSubmit}) {
  return (
    <section className={ `popup ${ isOpen ? 'popup_is-opened' : '' }` }>
      <div className="popup__container">
        <button onClick={ onClose } type="button" className="popup__close"></button>
        <h3 className="popup__title">{title}</h3>
        <form 
          name={ name }
          className={`popup__input-form`}
          onSubmit={ onSubmit }
          noValidate>
            { children }
            <button 
              type="submit"
              disabled={ !isValid || !isChanged }
              className={`popup__input-btn`}>
              { submitText }
            </button>
        </form>
      </div>
    </section>
  )
}

export default PopupForm;