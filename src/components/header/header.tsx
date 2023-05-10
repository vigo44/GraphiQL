import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';
import { CheckAuth } from '../../hooks/check-auth';
import { logoutUser } from '../../store/user-slice';
import './header.css';

import { Button } from '@mui/material';

import { RootState } from 'store';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = CheckAuth();
  const name = useSelector((state: RootState) => state.user.name);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(logoutUser());
      })
      .catch((error) => {
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
          <Button variant="contained" onClick={() => handleLogout()}>
            {name} | Log Out
          </Button>
        ) : (
          <>
            <Button variant="text" onClick={() => navigate('/sign-in')}>
              Sing In
            </Button>
            <Button variant="text" onClick={() => navigate('/sign-up')}>
              Sing Up
            </Button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
