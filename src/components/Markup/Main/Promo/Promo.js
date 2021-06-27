import './Promo.css';
import { Link } from 'react-router-dom';

function Promo() {

  return (
    <section className="promo">
      <div className="promo__banner">
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки</h1>
        <nav className="promo__navbar">
          <button className="promo__navbar-btn"><Link className="promo__navbar-btn_text" to="#about">О проекте</Link></button>
          <button className="promo__navbar-btn"><Link className="promo__navbar-btn_text" to='#techno'>Технологии</Link></button>
          <button className="promo__navbar-btn"><Link className="promo__navbar-btn_text" to="#student">Студент</Link></button>
        </nav>
      </div>
    </section>  
  )
}

export default Promo;