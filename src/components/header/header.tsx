import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';
import { CheckAuth } from '../../hooks/check-auth';
import { logoutUser } from '../../store/user-slice';
import { removeAuthError } from '../../store/auth-error-slice';

import { AppBar, Box, Button, ButtonGroup, Typography, useScrollTrigger } from '@mui/material';
import { Language } from '@mui/icons-material';

import { useTranslation } from 'react-i18next';

function Header() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = CheckAuth();
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

  const changeLanguage = () => {
    const currenLang = t('lang.appLang');

    dispatch(removeAuthError());

    currenLang === 'EN' ? i18n.changeLanguage('ru') : i18n.changeLanguage('en');
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
      <Box
        component="div"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
        }}
      >
        <Button variant="text" onClick={() => navigate('/welcome')}>
          {t('header.welcome')}
        </Button>
        {isAuth ? (
          <Button
            variant="contained"
            size={trigger ? 'small' : 'medium'}
            onClick={() => handleLogout()}
            sx={{ whiteSpace: 'nowrap' }}
          >
            {t('header.logOUT')}
          </Button>
        ) : (
          <ButtonGroup variant="contained" size={trigger ? 'small' : 'medium'}>
            <Button onClick={() => navigate('/sign-in')} sx={{ whiteSpace: 'nowrap' }}>
              {t('header.signIN')}
            </Button>
            <Button onClick={() => navigate('/sign-up')} sx={{ whiteSpace: 'nowrap' }}>
              {t('header.signUP')}
            </Button>
          </ButtonGroup>
        )}
        <Button
          sx={{ whiteSpace: 'nowrap' }}
          onClick={() => changeLanguage()}
          startIcon={<Language />}
          size={trigger ? 'small' : 'medium'}
        >
          <Typography variant="body1" component="div" color="gray">
            {t('lang.appLang')}
          </Typography>
        </Button>
      </Box>
    </AppBar>
  );
}

export default Header;
