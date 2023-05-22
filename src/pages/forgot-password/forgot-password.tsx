import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { setAuthError, removeAuthError } from '../../store/auth-error-slice';
import { setPassResetModalOpen } from '../../store/password-reset-modal-slice';
import ErrorMessage from '../../hooks/error-message';

import InputEmail from '../../components/form-inputs/email-input';
import PasswordResetModal from '../../components/password-reset-modal/password-reset-modal';

import { Alert, Box, Paper, Collapse, Link, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { RootState } from 'store';
import { FormInputs } from '../../pages/sign-up/sign-up';
import { useTranslation } from 'react-i18next';
import '../../i18nex';

function PasswordReset() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setErrorMessage } = ErrorMessage();
  const authError = useSelector((state: RootState) => state.authError);
  const [currenLang, setLang] = useState(t('lang.appLang') as string);
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = (email: string) => {
    const auth = getAuth();

    setLoading(true);

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

        setLoading(false);
      });
  };

  const {
    register,
    setValue,
    handleSubmit,
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
        {t('forgotPassForm.resetPass')}
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
          handlePasswordReset(data.email);
        })}
      >
        <InputEmail
          register={register}
          setValue={setValue}
          errors={errors}
          clearErrors={clearErrors}
        />
        <Collapse in={!!authError.error}>
          <Alert severity="warning" onClose={() => dispatch(removeAuthError())}>
            <span>{authError.error}</span>
          </Alert>
        </Collapse>
        <LoadingButton variant="contained" type="submit" loading={loading}>
          {t('forgotPassForm.confirm')}
        </LoadingButton>
      </Box>
      <Link
        component="button"
        underline="hover"
        onClick={() => {
          navigate('/sign-in');
        }}
      >
        {t('forgotPassForm.loginToYourAcc')}
      </Link>
      <PasswordResetModal />
    </Paper>
  );
}

export default PasswordReset;
