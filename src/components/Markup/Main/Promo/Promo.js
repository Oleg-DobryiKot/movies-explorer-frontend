import './Promo.css';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { TECHNO_ANCHOR_ID, PROJECT_ANCHOR_ID, STUDENT_ANCHOR_ID } from '../../../../constants/anchor-links';

function Promo() {

  return (
    <section className="promo">
      <div className="promo__banner">
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки</h1>
        <nav className="promo__navbar">
          <button className="promo__navbar-btn"><HashLink className="promo__navbar-btn_text" to={ `#${PROJECT_ANCHOR_ID}` }>О проекте</HashLink></button>
          <button className="promo__navbar-btn"><HashLink className="promo__navbar-btn_text" to={ `#${TECHNO_ANCHOR_ID}` }>Технологии</HashLink></button>
          <button className="promo__navbar-btn"><HashLink className="promo__navbar-btn_text" to={ `#${STUDENT_ANCHOR_ID}` }>Студент</HashLink></button>
        </nav>
      </div>
    </section>  
  )
}

export default Promo;