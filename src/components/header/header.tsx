import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';
import { CheckAuth } from '../../hooks/check-auth';
import { logoutUser } from '../../store/user-slice';

import { AppBar, Button, ButtonGroup, useScrollTrigger } from '@mui/material';

import { RootState } from 'store';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = CheckAuth();
  const name = useSelector((state: RootState) => state.user.name);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

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
    <AppBar
      component="header"
      position="sticky"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'space-betwen',
        height: trigger ? '50px' : '75px',
        p: '0 20px',
        backgroundColor: 'white',
        boxShadow: trigger ? '0px 5px 5px grey' : 'none',
        transition: '0.3s',
      }}
    >
      <div>
        <Button variant="text" onClick={() => navigate('/welcome')}>
          Welcome
        </Button>
        {isAuth ? (
          <Button
            variant="contained"
            size={trigger ? 'small' : 'medium'}
            onClick={() => handleLogout()}
          >
            {name} | Log Out
          </Button>
        ) : (
          <ButtonGroup variant="contained" size={trigger ? 'small' : 'medium'}>
            <Button onClick={() => navigate('/sign-in')}>Sing In</Button>
            <Button onClick={() => navigate('/sign-up')}>Sing Up</Button>
          </ButtonGroup>
        )}
      </div>
    </AppBar>
  );
}

export default Header;
