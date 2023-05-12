import { useDispatch } from 'react-redux';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { removeAuthError } from '../../store/auth-error-slice';

import { InputAdornment, TextField } from '@mui/material';

import { FormInputs } from '../../pages/sign-up/sign-up';
import { KeyOutlined } from '@mui/icons-material';

type ComponentProps = {
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
  watch: UseFormWatch<FormInputs>;
};

function InputConfirmPassword(props: ComponentProps) {
  const dispatch = useDispatch();

  return (
    <div>
      <TextField
        variant="outlined"
        size="small"
        label="Repeated password"
        type="text"
        placeholder="Repeat your password"
        {...props.register('confirm_password', {
          required: '*Please, repeat your password!',
          pattern: {
            value: /^(?=\D*\d)(?=.*?[a-zA-Z]).*[\W_].*$/i,
            message: '*Password should contain at least one number and one special character',
          },
          minLength: {
            value: 8,
            message: '*Password must be more than 8 characters',
          },
          maxLength: {
            value: 20,
            message: '*Password must be less than 20 characters',
          },
          validate: (val: string) => {
            if (props.watch('password') != val) {
              return '*Your passwords do no match';
            }
          },
        })}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <KeyOutlined />
            </InputAdornment>
          ),
        }}
        fullWidth
        error={props.errors.confirm_password ? true : false}
        helperText={
          props.errors.confirm_password
            ? props.errors.confirm_password.message
            : '*Enter the same password'
        }
        onChange={() => dispatch(removeAuthError())}
      />
    </div>
  );
}

export default InputConfirmPassword;
