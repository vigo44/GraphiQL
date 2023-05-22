import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FieldErrors, UseFormClearErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { removeAuthError } from '../../store/auth-error-slice';

import { IconButton, InputAdornment, TextField } from '@mui/material';

import { FormInputs } from '../../pages/sign-up/sign-up';
import { KeyOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import '../../i18nex';

type ComponentProps = {
  register: UseFormRegister<FormInputs>;
  setValue: UseFormSetValue<FormInputs>;
  errors: FieldErrors<FormInputs>;
  clearErrors: UseFormClearErrors<FormInputs>;
};

function InputPassword(props: ComponentProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const placeholder = t('passwordInput.placeholder');
  const required = t('passwordInput.required');
  const label = t('passwordInput.label');
  const helper = t('passwordInput.defaultHelper');

  useEffect(() => props.setValue('password', inputValue));

  return (
    <div>
      <TextField
        variant="outlined"
        size="small"
        label={label}
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        {...props.register('password', {
          required: required,
          pattern: {
            value: /^(?=\D*\d)(?=.*?[a-zA-Z]).*[\W_].*$/i,
            message: t('passwordInput.passwordPattern'),
          },
          minLength: {
            value: 8,
            message: t('passwordInput.passwordPattern8'),
          },
          maxLength: {
            value: 20,
            message: t('passwordInput.passwordPattern20'),
          },
        })}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <KeyOutlined />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        fullWidth
        error={props.errors.password ? true : false}
        helperText={props.errors.password ? props.errors.password.message : helper}
        onChange={(event) => {
          setInputValue(event.target.value);
          props.errors.password && props.clearErrors('password');
          dispatch(removeAuthError());
        }}
        value={inputValue}
      />
    </div>
  );
}

export default InputPassword;
