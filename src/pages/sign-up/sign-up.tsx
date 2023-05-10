import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { loginUser } from '../../store/user-slice';
import { setAuthError, removeAuthError } from '../../store/auth-error-slice';
import setErrorMessage from '../../common/error-message';

import InputName from '../../components/form-inputs/name-input';
import InputEmail from '../../components/form-inputs/email-input';
import InputPassword from '../../components/form-inputs/password-input';
import InputConfirmPassword from '../../components/form-inputs/confirm-password-input';

import { Alert, Box, Button, Collapse, Divider, Link, Typography } from '@mui/material';

import { RootState } from 'store';

export type FormInputs = {
  email: string;
  password: string;
  confirm_password: string;
  name: string;
};

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authError = useSelector((state: RootState) => state.authError);

  const handleRegister = (data: FormInputs) => {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        updateProfile(userCredential.user, {
          displayName: data.name,
        });

        signInWithEmailAndPassword(auth, data.email, data.password).then((userCredential) => {
          dispatch(
            loginUser({
              email: userCredential.user.email,
              token: userCredential.user.refreshToken,
              id: userCredential.user.uid,
              name: userCredential.user.displayName,
            })
          );
        });
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
    watch,
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
        backgroundColor: 'gainsboro',
        borderRadius: '10px',
      }}
    >
      <Typography
        variant="h3"
        component="h2"
        sx={{
          alignSelf: 'flex-start',
        }}
      >
        Sign Up
      </Typography>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '350px',
          p: '20px',
          backgroundColor: 'white',
          border: 1,
          borderRadius: '10px',
        }}
        onSubmit={handleSubmit((data) => {
          dispatch(removeAuthError());
          handleRegister(data);
        })}
      >
        <InputName register={register} errors={errors} />
        <InputEmail register={register} errors={errors} />
        <InputPassword register={register} errors={errors} />
        <InputConfirmPassword register={register} errors={errors} watch={watch} />
        <Collapse in={!!authError.error}>
          <Alert severity="warning" onClose={() => dispatch(removeAuthError())}>
            <span>{authError.error}</span>
          </Alert>
        </Collapse>
        <Button variant="contained" type="submit" value="SIGN UP">
          SIGN UP
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '80%',
        }}
      >
        <Link
          component="button"
          underline="hover"
          onClick={() => {
            navigate('/sign-in');
          }}
        >
          Login to your account
        </Link>
        <Divider sx={{ width: '100%' }}>Or</Divider>
        <Link
          component="button"
          underline="hover"
          sx={{ width: '100%' }}
          onClick={() => {
            navigate('/pass-reset');
          }}
        >
          Forgot your password
        </Link>
      </Box>
    </Box>
  );
}

export default SignUp;
