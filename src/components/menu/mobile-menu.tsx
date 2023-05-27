import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckAuth } from '../../hooks/check-auth';

import {
  Box,
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  useScrollTrigger,
} from '@mui/material';
import { WavingHand, Person, PersonAdd, Logout, FormatIndentIncrease } from '@mui/icons-material';

import { useTranslation } from 'react-i18next';

type ComponentProps = {
  handleLogout: () => void;
};

function MobileMenu(props: ComponentProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuth } = CheckAuth();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      component="div"
      sx={{
        display: { lg: 'none', md: 'none', sm: 'none', xs: 'inline-flex' },
      }}
    >
      <Button variant="contained" onClick={handleClick} size={trigger ? 'small' : 'medium'}>
        {t('header.menu')}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            marginTop: '10px',
          },
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          sx: {
            width: '200px',
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          },
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            navigate('/welcome');
          }}
        >
          <ListItemIcon>
            <WavingHand fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('header.welcome')}</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate('/');
          }}
          sx={{
            display: isAuth ? 'flex' : 'none',
          }}
        >
          <ListItemIcon>
            <FormatIndentIncrease fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('header.editor')}</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate('/sign-in');
          }}
          sx={{
            display: isAuth ? 'none' : 'flex',
          }}
        >
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('header.signIN')}</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate('/sign-up');
          }}
          sx={{
            display: isAuth ? 'none' : 'flex',
          }}
        >
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('header.signUP')}</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            props.handleLogout();
          }}
          sx={{
            display: isAuth ? 'flex' : 'none',
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('header.logOUT')}</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default MobileMenu;
