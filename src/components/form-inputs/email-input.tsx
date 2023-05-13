import { useDispatch } from 'react-redux';
import { FieldErrors, UseFormClearErrors, UseFormRegister } from 'react-hook-form';
import { removeAuthError } from '../../store/auth-error-slice';

import { InputAdornment, TextField } from '@mui/material';
import { MailOutline } from '@mui/icons-material';

import { FormInputs } from '../../pages/sign-up/sign-up';
import { useTranslation } from 'react-i18next';
import '../../i18nex';

type ComponentProps = {
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
  clearErrors: UseFormClearErrors<FormInputs>;
};

function InputEmail(props: ComponentProps) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const placeholder = t('emailInput.placeholder');
  const required = t('emailInput.required');
  const helper = t('emailInput.defaultHelper');
  const label = t('emailInput.label');

  return (
    <div>
      <TextField
        variant="outlined"
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
        onChange={() => {
          props.errors.email && props.clearErrors('email');
          dispatch(removeAuthError());
        }}
      />
    </div>
  );
}

export default InputEmail;
