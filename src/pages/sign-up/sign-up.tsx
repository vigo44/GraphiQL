import { useEffect, useState } from 'react';
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
import ErrorMessage from '../../hooks/error-message';

import InputName from '../../components/form-inputs/name-input';
import InputEmail from '../../components/form-inputs/email-input';
import InputPassword from '../../components/form-inputs/password-input';
import InputConfirmPassword from '../../components/form-inputs/confirm-password-input';

import { Alert, Box, Paper, Button, Collapse, Divider, Link, Typography } from '@mui/material';

import { RootState } from 'store';
import { useTranslation } from 'react-i18next';
import '../../i18nex';

export type FormInputs = {
  email: string;
  password: string;
  confirm_password: string;
  name: string;
};

function SignUp() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setErrorMessage } = ErrorMessage();
  const authError = useSelector((state: RootState) => state.authError);
  const [currenLang, setLang] = useState(t('lang.appLang') as string);

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

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
    clearErrors,
  } = useForm<FormInputs>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const changeLanguage = (currenLang: string) => {
    const newLang = t('lang.appLang');

    if (currenLang !== newLang) {
      setLang(newLang);
      clearErrors();
    }
  };

  useEffect(() => {
    dispatch(removeAuthError());
  }, [dispatch]);

  useEffect(() => changeLanguage(currenLang));

  return (
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
        {t('signUpForm.signUpTitle')}
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
          borderRadius: '5px',
        }}
        onSubmit={handleSubmit((data) => {
          dispatch(removeAuthError());
          handleRegister(data);
        })}
      >
        <InputName
          register={register}
          setValue={setValue}
          errors={errors}
          clearErrors={clearErrors}
        />
        <InputEmail
          register={register}
          setValue={setValue}
          errors={errors}
          clearErrors={clearErrors}
        />
        <InputPassword
          register={register}
          setValue={setValue}
          errors={errors}
          clearErrors={clearErrors}
        />
        <InputConfirmPassword
          register={register}
          setValue={setValue}
          errors={errors}
          watch={watch}
          clearErrors={clearErrors}
        />
        <Collapse in={!!authError.error}>
          <Alert severity="warning" onClose={() => dispatch(removeAuthError())}>
            <span>{authError.error}</span>
          </Alert>
        </Collapse>
        <Button variant="contained" type="submit" value="SIGN UP">
          {t('signUpForm.signUP')}
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
          {t('signUpForm.loginToYourAcc')}
        </Link>
        <Divider sx={{ width: '100%' }}>{t('signUpForm.or')}</Divider>
        <Link
          component="button"
          underline="hover"
          sx={{ width: '100%' }}
          onClick={() => {
            navigate('/pass-reset');
          }}
        >
          {t('signUpForm.forgotYourPass')}
        </Link>
      </Box>
    </Paper>
  );
}

export default SignUp;
