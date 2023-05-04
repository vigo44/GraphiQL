import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CheckAuth } from '../../hooks/check-auth';
import { logoutUser } from '../../store/user-slice';
import './header.css';

function Header() {
  const dispatch = useDispatch();
  const { isAuth } = CheckAuth();

  return (
    <header className="header">
      <div className="header_wrapper-link">
        <NavLink to="/welcome" end className="header__link">
          Welcome
        </NavLink>
        {isAuth ? (
          <button onClick={() => dispatch(logoutUser())}>Log Out</button>
        ) : (
          <>
            <NavLink to="/sign-in" end className="header__link">
              Sing In
            </NavLink>
            <NavLink to="/sign-up" end className="header__link">
              Sing Up
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
