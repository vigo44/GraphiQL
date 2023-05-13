import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { removeAuthError } from '../../store/auth-error-slice';

import { IconButton, InputAdornment, TextField } from '@mui/material';

import { FormInputs } from '../../pages/sign-up/sign-up';
import { KeyOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import '../../i18nex';

type ComponentProps = {
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
  watch: UseFormWatch<FormInputs>;
};

function InputConfirmPassword(props: ComponentProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const placeholder = t('repeatPassInput.placeholder');
  const required = t('repeatPassInput.required');
  const label = t('repeatPassInput.label');
  const helper = t('repeatPassInput.defaultHelper');
  const validatePass = t('repeatPassInput.validatePass');

  return (
    <div>
      <TextField
        variant="outlined"
        size="small"
        label={label}
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        {...props.register('confirm_password', {
          required: required,
          pattern: {
            value: /^(?=\D*\d)(?=.*?[a-zA-Z]).*[\W_].*$/i,
            message: t('repeatPassInput.passwordPattern'),
          },
          minLength: {
            value: 8,
            message: t('repeatPassInput.passwordPattern8'),
          },
          maxLength: {
            value: 20,
            message: t('repeatPassInput.passwordPattern20'),
          },
          validate: (val: string) => {
            if (props.watch('password') != val) {
              return validatePass;
            }
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
        error={props.errors.confirm_password ? true : false}
        helperText={
          props.errors.confirm_password
            ? props.errors.confirm_password.message
            : helper
        }
        onChange={() => dispatch(removeAuthError())}
      />
    </div>
  );
}

export default InputConfirmPassword;
