import { NavLink } from 'react-router-dom';
import './header.css';

function Header() {
  return (
    <header className="header">
      <div className="header_wrapper-link">
        <NavLink to="/" end className="header__link">
          Home
        </NavLink>
        <NavLink to="/editor" end className="header__link">
          Editor
        </NavLink>
        <NavLink to="/sign-in" end className="header__link">
          Sing In
        </NavLink>
        <NavLink to="/sign-up" end className="header__link">
          Sing Up
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
