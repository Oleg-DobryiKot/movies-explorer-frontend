import './Footer.css';
import NavSocial from '../NavSocial/NavSocial';

function Footer() {
  return(
    <footer className="footer">
      <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__nav">
        <p className="footer__copyright">&copy; 2021</p>
        <NavSocial/>
      </div>
    </footer>   
  )
}

export default Footer;