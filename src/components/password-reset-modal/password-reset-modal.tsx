import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPassResetModalClose } from '../../store/password-reset-modal-slice';

import { Modal, Box, Button, Typography, Paper } from '@mui/material';

import { RootState } from 'store';
import { useTranslation } from 'react-i18next';
import '../../i18nex';

function PasswordResetModal() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const passResetModal = useSelector((state: RootState) => state.passResetModal);

  return (
    <Modal
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}
      open={passResetModal.isPassResetModalOpen}
      onClose={() => {
        dispatch(setPassResetModalClose());
        navigate('/sign-in');
      }}
    >
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
          {t('passResetModal.successHeader')}
        </Typography>
        <Typography
          variant="body1"
          component="p"
          sx={{
            alignSelf: 'flex-start',
            maxWidth: '400px',
          }}
        >
          {t('passResetModal.successText')}
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            dispatch(setPassResetModalClose());
            navigate('/sign-in');
          }}
          fullWidth
        >
          {t('passResetModal.signIN')}
        </Button>
      </Paper>
    </Modal>
  );
}

export default PasswordResetModal;
