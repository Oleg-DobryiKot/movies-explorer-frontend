import './NotFoundError.css';
import { Link } from 'react-router-dom';

function NotFoundError() {

  return (
    <section className="error__page">
      <div className="error__page_info">
        <p className="error__page_title">404</p>
        <p className="error__page_subtitle">Страница не найдена</p>
      </div>
      <Link to={'/'} className="error__page_back-link">{ 'Назад' }</Link>
    </section>  
  )
}

export default NotFoundError;