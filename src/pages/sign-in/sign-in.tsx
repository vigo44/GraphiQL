import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { loginUser } from '../../store/user-slice';
import { setAuthError, removeAuthError } from '../../store/auth-error-slice';
import setErrorMessage from '../../common/error-message';

import InputEmail from '../../components/form-inputs/email-input';
import InputPassword from '../../components/form-inputs/password-input';

import { Alert, Box, Button, Collapse, Divider, Link, Typography } from '@mui/material';

import { RootState } from 'store';
import { FormInputs } from '../../pages/sign-up/sign-up';
import { useTranslation } from 'react-i18next';
import '../../i18nex';

function SignIn() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authError = useSelector((state: RootState) => state.authError);

  const handleLogin = (data: FormInputs) => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        dispatch(
          loginUser({
            email: userCredential.user.email,
            token: userCredential.user.refreshToken,
            id: userCredential.user.uid,
            name: userCredential.user.displayName,
          })
        );
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
        {t('signInForm.signInTitle')}
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
          handleLogin(data);
        })}
      >
        <InputEmail register={register} errors={errors} />
        <InputPassword register={register} errors={errors} />
        <Collapse in={!!authError.error}>
          <Alert severity="warning" onClose={() => dispatch(removeAuthError())}>
            <span>{authError.error}</span>
          </Alert>
        </Collapse>
        <Button variant="contained" type="submit">
          {t('signInForm.signIN')}
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
            navigate('/sign-up');
          }}
        >
          {t('signInForm.createNewAcc')}
        </Link>
        <Divider sx={{ width: '100%' }}>{t('signInForm.or')}</Divider>
        <Link
          component="button"
          underline="hover"
          sx={{ width: '100%' }}
          onClick={() => {
            navigate('/pass-reset');
          }}
        >
          {t('signInForm.forgotYourPass')}
        </Link>
      </Box>
    </Box>
  );
}

export default SignIn;
