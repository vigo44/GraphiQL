import { useDispatch } from 'react-redux';
import { FieldErrors, UseFormClearErrors, UseFormRegister } from 'react-hook-form';
import { removeAuthError } from '../../store/auth-error-slice';

import { InputAdornment, TextField } from '@mui/material';

import { FormInputs } from '../../pages/sign-up/sign-up';
import { PersonOutline } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import '../../i18nex';

type ComponentProps = {
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
  clearErrors: UseFormClearErrors<FormInputs>;
};

function InputName(props: ComponentProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const placeholder = t('nameInput.placeholder');
  const required = t('nameInput.required');
  const label = t('nameInput.label');

  return (
    <div>
      <TextField
        variant="outlined"
        size="small"
        label={label}
        type="text"
        placeholder={placeholder}
        {...props.register('name', {
          required: required,
          pattern: {
            value:
              /^([A-Za-zА-Яа-яЁё]{2,}\s[A-Za-zА-Яа-яЁё]{1,}'?-?[A-Za-zА-Яа-яЁё]{2,}\s?([A-Za-zА-Яа-яЁё]{1,})?)$/i,
            message: t('nameInput.namePattern'),
          },
        })}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonOutline />
            </InputAdornment>
          ),
        }}
        fullWidth
        error={props.errors.name ? true : false}
        helperText={props.errors.name ? props.errors.name.message : '*Jonh Dow'}
        onChange={() => {
          props.errors.name && props.clearErrors('name');
          dispatch(removeAuthError());
        }}
      />
    </div>
  );
}

export default InputName;
