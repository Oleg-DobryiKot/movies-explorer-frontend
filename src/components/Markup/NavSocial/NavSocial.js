import './NavSocial.css';
import { Link } from 'react-router-dom';

function NavSocial() {

  return (
    <ul className="nav-social_menu">
      <li className="nav-social_menu-links">
        <Link to="/signin" className="nav-social_menu-link" >{ 'Яндекс.Практикум' }</Link>
      </li>
      <li className="nav-social_menu-links">
        <Link to="/" className="nav-social_menu-link">{ 'Facebook' }</Link>
      </li>
      <li className="nav-social_menu-links">
        <Link to="/signin" className="nav-social_menu-link" >{ 'GitHub' }</Link>
      </li>
    </ul>            
  )
}

export default NavSocial;