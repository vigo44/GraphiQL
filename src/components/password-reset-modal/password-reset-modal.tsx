import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPassResetModalClose } from '../../store/password-reset-modal-slice';

import { Modal, Box, Button } from '@mui/material';

import { RootState } from 'store';

function PasswordResetModal() {
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '350px',
          height: 'fit-content',
          p: '20px',
          backgroundColor: 'white',
          border: 1,
          borderRadius: '10px',
        }}
      >
        <span>Success! Check your email to reset your password.</span>
        <Button
          variant="contained"
          onClick={() => {
            dispatch(setPassResetModalClose());
            navigate('/sign-in');
          }}
        >
          SIGN IN
        </Button>
      </Box>
    </Modal>
  );
}

export default PasswordResetModal;
