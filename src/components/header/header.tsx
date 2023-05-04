import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getDatabase, ref, update, get, child } from 'firebase/database';
import { CheckAuth } from '../../hooks/check-auth';
import { logoutUser } from '../../store/user-slice';
import './header.css';
import { useEffect, useState } from 'react';

function Header() {
  const dispatch = useDispatch();
  const { isAuth } = CheckAuth();
  const [name, setName] = useState('');

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

  const handleAutoLogin = () => {
    const auth = getAuth();
    const database = getDatabase();
    const date = new Date();
    const dbRef = ref(getDatabase());
    onAuthStateChanged(auth, (user) => {
      if (user) {
        update(ref(database, 'users/' + user.uid), {
          last_login: date,
        });
        get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setName(data.name);
          } else {
            console.log('No data available');
          }
        });
      }
    });
  };

  useEffect(() => {
    handleAutoLogin();
  });

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
