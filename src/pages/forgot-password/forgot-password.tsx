import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { setAuthError, removeAuthError } from '../../store/auth-error-slice';
import { setPassResetModalOpen } from '../../store/password-reset-modal-slice';
import setErrorMessage from '../../common/error-message';

import InputEmail from '../../components/form-inputs/email-input';
import PasswordResetModal from '../../components/password-reset-modal/password-reset-modal';

import { Alert, Box, Button } from '@mui/material';

import { RootState } from 'store';
import { FormInputs } from '../../pages/sign-up/sign-up';

function PasswordReset() {
  const dispatch = useDispatch();
  const authError = useSelector((state: RootState) => state.authError);
  const passResetModal = useSelector((state: RootState) => state.passResetModal);

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
    <div>
      <h1>Reset password</h1>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '350px',
          p: '20px',
          border: 1,
          borderRadius: '10px',
        }}
        onSubmit={handleSubmit((data) => {
          dispatch(removeAuthError());
          handlePasswordReset(data.email);
        })}
      >
        <InputEmail register={register} errors={errors} />
        <Button variant="contained" type="submit">
          CONFIRM
        </Button>
      </Box>
      <span>
        Or <Link to="/sign-in">login to your account</Link>
      </span>
      {authError.error && (
        <Alert severity="warning" onClose={() => dispatch(removeAuthError())}>
          <span>{authError.error}</span>
        </Alert>
      )}
      {passResetModal.isPassResetModalOpen && <PasswordResetModal />}
    </div>
  );
}

export default PasswordReset;
