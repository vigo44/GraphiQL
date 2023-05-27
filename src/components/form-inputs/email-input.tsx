import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FieldErrors, UseFormClearErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { removeAuthError } from '../../store/auth-error-slice';

import { InputAdornment, TextField } from '@mui/material';
import { MailOutline } from '@mui/icons-material';

import { FormInputs } from '../../pages/sign-up/sign-up';
import { useTranslation } from 'react-i18next';
import '../../i18nex';

type ComponentProps = {
  register: UseFormRegister<FormInputs>;
  setValue: UseFormSetValue<FormInputs>;
  errors: FieldErrors<FormInputs>;
  clearErrors: UseFormClearErrors<FormInputs>;
};

function InputEmail(props: ComponentProps) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');

  const placeholder = t('emailInput.placeholder');
  const required = t('emailInput.required');
  const helper = t('emailInput.defaultHelper');
  const label = t('emailInput.label');

  useEffect(() => props.setValue('email', inputValue));

  return (
    <div>
      <TextField
        variant="outlined"
        autoComplete="new-password"
        size="small"
        label={label}
        type="text"
        placeholder={placeholder}
        {...props.register('email', {
          required: required,
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: t('emailInput.emailPattern'),
          },
        })}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MailOutline />
            </InputAdornment>
          ),
        }}
        fullWidth
        error={props.errors.email ? true : false}
        helperText={props.errors.email ? props.errors.email.message : helper}
        onChange={(event) => {
          setInputValue(event.target.value);
          props.errors.email && props.clearErrors('email');
          dispatch(removeAuthError());
        }}
        value={inputValue}
      />
    </div>
  );
}

export default InputEmail;
