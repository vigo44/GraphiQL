import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CheckAuth } from '../../hooks/check-auth';

import { Box, Button, ButtonGroup, Typography } from '@mui/material';

import { RootState } from '../../store';
import { useTranslation } from 'react-i18next';
import '../../i18nex';

function WelcomeSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuth } = CheckAuth();
  const name = useSelector((state: RootState) => state.user.name);

  return (
    <Box
      component="section"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '15px',
        minHeight: 'calc(100vh - 50px)',
      }}
    >
      <Typography
        variant="h1"
        component="h1"
        sx={{
          textAlign: 'center',
          fontSize: { lg: '3rem', md: '2.6rem', sm: '2.3rem', xs: '2.1rem' },
        }}
      >
        {t('welcomeSection.welcome')}
        {isAuth && `, ${name}`}
      </Typography>
      <Typography
        variant="h4"
        component="h4"
        sx={{
          textAlign: 'center',
          fontSize: { lg: '2.3rem', md: '2.1rem', sm: '1.8rem', xs: '1.5rem' },
        }}
      >
        {t('welcomeSection.title')}
      </Typography>
      <Typography
        variant="body1"
        component="p"
        sx={{ width: { lg: '60%', md: '70%', sm: '80%', xs: '90%' }, textAlign: 'center' }}
      >
        {t('welcomeSection.text')}
      </Typography>
      <Typography
        variant="body1"
        component="p"
        sx={{ width: { lg: '60%', md: '70%', sm: '80%', xs: '90%' }, textAlign: 'center' }}
      >
        {t('welcomeSection.text2')}
      </Typography>
      {isAuth ? (
        <Button variant="outlined" onClick={() => navigate('/')}>
          {t('welcomeSection.goToEditor')}
        </Button>
      ) : (
        <ButtonGroup variant="outlined" size="large">
          <Button onClick={() => navigate('/sign-in')}>{t('welcomeSection.signIN')}</Button>
          <Button onClick={() => navigate('/sign-up')}>{t('welcomeSection.signUP')}</Button>
        </ButtonGroup>
      )}
    </Box>
  );
}

export default WelcomeSection;
