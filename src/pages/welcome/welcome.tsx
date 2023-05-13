import { Box } from '@mui/material';

import WelcomeSection from '../../components/welcome/welcome-section';
import CreatorsSection from '../../components/welcome/creators-section';
import RsshoolSection from '../../components/welcome/rsschool-section';

function Welcome() {
  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '40px',
        width: '90%',
        maxWidth: '1080px',
        marginBottom: '20px',
      }}
    >
      <WelcomeSection />
      <RsshoolSection />
      <CreatorsSection />
    </Box>
  );
}

export default Welcome;
