import logoResolve from '../../../images/logo/logo-res.svg';
import logoReject from '../../../images/logo/logo-rej.svg';
import './Tooltip2.css';
import React, { useContext } from 'react';
import 'react-dom';
import { TooltipContext } from '../../../contexts/TooltipContext';

function getTooltipLogo(message) {
  if (!message) {
    return null;
  }
  if (message.type === 'info') {
    return logoResolve;
  }
  if (message.type === 'error') {
    return logoReject;
  }
  return null;
}

function Tooltip2() {
  const { message, setMessage } = useContext(TooltipContext);

  if (message) {
    setTimeout(() => setMessage(null), 3000);
  }

  const tooltipLogo = getTooltipLogo(message);

  return message ? (
    <section className={ 'tooltip' }>
      <div className="tooltip__container">
        <button onClick={ () => setMessage(null) } type="button" className="tooltip__close"></button>
        {
          tooltipLogo
            ? <img
              className="tooltip__icon"
              src={ tooltipLogo }
              alt="Успешный логин"
            />
            : null
        }
        <h3 className="tooltip__title">{ message.text }</h3> 
      </div>
    </section>
  ) : null;
}

export default Tooltip2;