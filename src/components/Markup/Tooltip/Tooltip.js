import logoResolve from '../../../images/logo/logo-res.svg';
import logoReject from '../../../images/logo/logo-rej.svg';
import './Tooltip.css';
import React, { useContext } from 'react';
import 'react-dom';
import { ErrorMessageContext } from '../../../contexts/ErrorMessageContext';

function Tooltip({ isOpen, onClose, isRegistered, isLoggedIn }) {
  const { message, setErrorMessage } = useContext(ErrorMessageContext);

  const TooltipMessage = (isRegistered || isLoggedIn) ? 'Все прошло успешно!' : (message || 'Что-то пошло не так!');
  const TooltipLogo = (isRegistered || isLoggedIn) ? logoResolve : logoReject;

  if (isOpen) {
    setTimeout(() => onClose(), 2000);
  }

  return (
    <section className={ `tooltip ${ isOpen ? 'tooltip_is-open' : '' }` }>
      <div className="tooltip__container">
        <button onClick={ onClose } type="button" className="tooltip__close"></button>
          <img
            className="tooltip__icon"
            src={ TooltipLogo }
            alt="Успешный логин"
          /> 
        <h3 className="tooltip__title">{ TooltipMessage }</h3> 
      </div>
    </section>
  )
}

export default Tooltip;