import { useNavigate } from 'react-router-dom';
import { CheckAuth } from '../../hooks/check-auth';

import { Box, Button, ButtonGroup, useScrollTrigger } from '@mui/material';

import { useTranslation } from 'react-i18next';

type ComponentProps = {
  handleLogout: () => void;
};

function DesktopMenu(props: ComponentProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuth } = CheckAuth();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <Box
      component="div"
      sx={{
        display: { lg: 'flex', md: 'flex', sm: 'flex', xs: 'none' },
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
          onClick={() => props.handleLogout()}
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
    </Box>
  );
}

export default DesktopMenu;
