import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { GitHub } from '@mui/icons-material';

import rs_school from '../../assets/rs_school.svg';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        flexDirection: { md: 'row', sm: 'column', xs: 'column' },
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'black',
        boxShadow: '0px -2px 2px black',
      }}
    >
      <Box
        component="img"
        sx={{
          width: 60,
          p: '20px',
        }}
        alt="RsSchool logo"
        src={rs_school}
        onClick={() => (window.location.href = 'https://rs.school/react/')}
      />
      <List
        sx={{
          display: 'flex',
          flexDirection: { md: 'row', sm: 'column', xs: 'column' },
          justifyContent: 'center',
          width: { xl: '50%', lg: '75%', md: 'fit-content' },
          p: 0,
        }}
      >
        <ListItemButton
          component="a"
          href="https://github.com/vigo44"
          sx={{ flexGrow: 0, width: 'fit-content' }}
        >
          <ListItemIcon sx={{ minWidth: '35px' }}>
            <GitHub color="primary" />
          </ListItemIcon>
          <ListItemText primary="vigo44" sx={{ color: 'white' }} />
        </ListItemButton>
        <ListItemButton
          component="a"
          href="https://github.com/Spektar001"
          sx={{ flexGrow: 0, width: 'fit-content' }}
        >
          <ListItemIcon sx={{ minWidth: '35px' }}>
            <GitHub color="primary" />
          </ListItemIcon>
          <ListItemText primary="Spektar001" sx={{ color: 'white' }} />
        </ListItemButton>
        <ListItemButton
          component="a"
          href="https://github.com/LoginamNet"
          sx={{ flexGrow: 0, width: 'fit-content' }}
        >
          <ListItemIcon sx={{ minWidth: '35px' }}>
            <GitHub color="primary" />
          </ListItemIcon>
          <ListItemText primary="LoginamNet" sx={{ color: 'white' }} />
        </ListItemButton>
      </List>
      <Typography sx={{ p: '20px', color: 'white' }}>2023</Typography>
    </Box>
  );
}

export default Footer;
