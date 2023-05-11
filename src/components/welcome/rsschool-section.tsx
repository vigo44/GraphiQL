import { Box, Button, ButtonGroup, Paper, Typography } from '@mui/material';

import rs_school_black from '../../assets/rs_school_black.svg';
import { useTranslation } from 'react-i18next';
import '../../i18nex';

function RsshoolSection() {
  const { t } = useTranslation();
  return (
    <Paper
      elevation={3}
      component="section"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        width: '100%',
        p: '20px',
        bgcolor: 'gold',
      }}
    >
      <Box
        component="div"
        sx={{
          display: 'flex',
          flexDirection: { lg: 'row', md: 'row', sm: 'column', xs: 'column' },
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          width: '100%',
        }}
      >
        <Box
          component="img"
          sx={{
            width: '100px',
            p: '20px',
          }}
          alt="RsSchool logo"
          src={rs_school_black}
        />
        <Box
          component="div"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography variant="body1" component="p" sx={{ textAlign: 'center' }}>
            {t('rsschoolSection.text')}
          </Typography>
          <ButtonGroup variant="text">
            <Button component="a" href="https://rs.school">
              RsShcool
            </Button>
            <Button component="a" href="https://rs.school/react/">
              React
            </Button>
            <Button component="a" href="https://t.me/therollingscopes/">
              Telegram
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </Paper>
  );
}

export default RsshoolSection;
