import { useDispatch } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';
import { logoutUser } from '../../store/user-slice';
import { removeAuthError } from '../../store/auth-error-slice';

import DesktopMenu from '../../components/menu/desktop-menu';
import MobileMenu from '../../components/menu/mobile-menu';

import { AppBar, Box, Button, Typography, useScrollTrigger } from '@mui/material';
import { Language } from '@mui/icons-material';

import { useTranslation } from 'react-i18next';

function Header() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
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
        alignItems: 'center',
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
          justifyContent: 'flex-end',
          gap: '15px',
          width: '100%',
          maxWidth: '1200px',
        }}
      >
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
        <DesktopMenu handleLogout={handleLogout} />
        <MobileMenu handleLogout={handleLogout} />
      </Box>
    </AppBar>
  );
}

export default Header;
