import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { setAuthError, removeAuthError } from '../../store/auth-error-slice';
import { setPassResetModalOpen } from '../../store/password-reset-modal-slice';
import setErrorMessage from '../../common/error-message';

import InputEmail from '../../components/form-inputs/email-input';
import PasswordResetModal from '../../components/password-reset-modal/password-reset-modal';

import { Alert, Box, Button, Collapse, Link, Typography } from '@mui/material';

import { RootState } from 'store';
import { FormInputs } from '../../pages/sign-up/sign-up';

function PasswordReset() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authError = useSelector((state: RootState) => state.authError);

  const handlePasswordReset = (email: string) => {
    const auth = getAuth();

    sendPasswordResetEmail(auth, email)
      .then(() => {
        dispatch(setPassResetModalOpen());
      })
      .catch((error) => {
        dispatch(
          setAuthError({
            error: setErrorMessage(error.code),
          })
        );
      });
  };

  useEffect(() => {
    dispatch(removeAuthError());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        p: '20px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0px 5px 10px grey',
      }}
    >
      <Typography
        variant="h3"
        component="h2"
        sx={{
          alignSelf: 'flex-start',
        }}
      >
        Reset password
      </Typography>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: { sm: '350px', xs: '215px' },
          p: '20px',
          backgroundColor: 'white',
          border: 1,
          borderRadius: '10px',
        }}
        onSubmit={handleSubmit((data) => {
          dispatch(removeAuthError());
          handlePasswordReset(data.email);
        })}
      >
        <InputEmail register={register} errors={errors} />
        <Collapse in={!!authError.error}>
          <Alert severity="warning" onClose={() => dispatch(removeAuthError())}>
            <span>{authError.error}</span>
          </Alert>
        </Collapse>
        <Button variant="contained" type="submit">
          CONFIRM
        </Button>
      </Box>
      <Link
        component="button"
        underline="hover"
        onClick={() => {
          navigate('/sign-in');
        }}
      >
        Login to your account
      </Link>
      <PasswordResetModal />
    </Box>
  );
}

export default PasswordReset;
