import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';
import { CheckAuth } from '../../hooks/check-auth';
import { logoutUser } from '../../store/user-slice';
import './header.css';

import { RootState } from 'store';

function Header() {
  const dispatch = useDispatch();
  const { isAuth } = CheckAuth();
  const name = useSelector((state: RootState) => state.user.name);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(logoutUser());
      })
      .catch((error) => {
        console.log(error.code, error.message);
        alert('Logout failed');
        alert(error);
      });
  };

  return (
    <header className="header">
      <div className="header_wrapper-link">
        <NavLink to="/welcome" end className="header__link">
          Welcome
        </NavLink>
        {isAuth ? (
          <button onClick={() => handleLogout()}>{name} | Log Out</button>
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
