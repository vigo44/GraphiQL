import { Outlet } from 'react-router-dom';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';

import { Box, useScrollTrigger } from '@mui/material';

function Layout() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <>
      <Header />
      <Box
        component="main"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '90%',
          minHeight: trigger ? 'calc(100vh - 140px)' : 'calc(100vh - 165px)',
          m: '0 auto',
          p: '20px 0',
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}

export default Layout;
