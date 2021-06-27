import './Portfolio.css';

import { Link } from 'react-router-dom';

function Portfolio() {

  return (  
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <nav className="portfolio__menu"> 
        <div className="portfolio__menu_project">
          <p className="portfolio__menu_project-name">Статичный сайт</p>
          <Link to="/" className="portfolio__menu_project-icon">{ '↗' }</Link>         
        </div>
        <div className="portfolio__menu_project">
          <p className="portfolio__menu_project-name">Адаптивный сайт</p>
          <Link to="/" className="portfolio__menu_project-icon">{ '↗' }</Link>         
        </div>
        <div className="portfolio__menu_project">
          <p className="portfolio__menu_project-name">Одностраничное приложение</p>
          <Link to="/" className="portfolio__menu_project-icon">{ '↗' }</Link>         
        </div>
      </nav>
    </section>
  )
}

export default Portfolio;