import './NavSocial.css';
import { Link } from 'react-router-dom';

function NavSocial({isFooter}) {
  const classMobile = isFooter ? "nav-social_menu nav-social_menu-mobile" : "nav-social_menu";
  const classFooterLink = isFooter ? "nav-social_menu-link nav-social_menu-link_mobile" : "nav-social_menu-link"
  return (
    <ul className={ classMobile }>
      {isFooter &&
      <li className="nav-social_menu-links">
        <Link to="https://praktikum.yandex.ru" className={classFooterLink} >{ 'Яндекс.Практикум' }</Link>
      </li>}
      <li className="nav-social_menu-links">
        <Link to="https://www.facebook.com/oleg.matveev.940/" className={classFooterLink}>{ 'Facebook' }</Link>
      </li>
      <li className="nav-social_menu-links">
        <Link to="https://github.com/Oleg-DobryiKot" className={classFooterLink} >{ 'GitHub' }</Link>
      </li>
    </ul>            
  )
}

export default NavSocial;