import { Outlet } from 'react-router-dom';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';

import { Box } from '@mui/material';

function Layout() {
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
