import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';
import { CheckAuth } from '../../hooks/check-auth';
import { logoutUser } from '../../store/user-slice';

import { AppBar, Button, ButtonGroup, useScrollTrigger } from '@mui/material';

import { RootState } from 'store';
import { useTranslation } from 'react-i18next';

function Header() {
  const { t, i18n } = useTranslation();
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

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <AppBar
      component="header"
      position="sticky"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: trigger ? '50px' : '75px',
        p: '0 20px',
        backgroundColor: 'white',
        boxShadow: trigger ? '0px 5px 5px grey' : 'none',
        transition: '0.3s',
      }}
    >
      <div>
        <Button variant="text" onClick={() => navigate('/welcome')}>
          {t('header.welcome')}
        </Button>
        {isAuth ? (
          <Button
            variant="contained"
            size={trigger ? 'small' : 'medium'}
            onClick={() => handleLogout()}
          >
            {name} | {t('header.logOUT')}
          </Button>
        ) : (
          <ButtonGroup variant="contained" size={trigger ? 'small' : 'medium'}>
            <Button onClick={() => navigate('/sign-in')}>{t('header.signIN')}</Button>
            <Button onClick={() => navigate('/sign-up')}>{t('header.signUP')}</Button>
          </ButtonGroup>
        )}
        <ButtonGroup variant="contained" size={trigger ? 'small' : 'medium'}>
          <Button onClick={() => changeLanguage('en')}>EN</Button>
          <Button onClick={() => changeLanguage('ru')}>RU</Button>
        </ButtonGroup>
      </div>
    </AppBar>
  );
}

export default Header;
