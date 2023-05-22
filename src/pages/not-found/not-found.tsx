import { useNavigate } from 'react-router-dom';

import { Box, Divider, Link, Paper, Typography } from '@mui/material';

import { useTranslation } from 'react-i18next';
import '../../i18nex';

function NotFound() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        p: '20px',
        backgroundColor: 'white',
      }}
    >
      <Typography
        variant="h3"
        component="h2"
        sx={{
          alignSelf: 'flex-start',
          fontSize: { lg: '3rem', md: '2.5rem', sm: '2rem', xs: '1.5rem' },
        }}
      >
        404
      </Typography>
      <Typography
        variant="body1"
        component="p"
        sx={{
          alignSelf: 'flex-start',
          maxWidth: '400px',
        }}
      >
        {t('notFoundPage.notFound')}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '80%',
        }}
      >
        <Divider sx={{ width: '100%' }} />
        <Link
          component="button"
          underline="hover"
          sx={{ width: '100%', paddingTop: '10px' }}
          onClick={() => {
            navigate('/welcome');
          }}
        >
          {t('notFoundPage.toWelcomePage')}
        </Link>
      </Box>
    </Paper>
  );
}

export default NotFound;
