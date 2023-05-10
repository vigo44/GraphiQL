import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { Alert, InputAdornment, TextField } from '@mui/material';

import { FormInputs } from '../../pages/sign-up/sign-up';
import { KeyOutlined } from '@mui/icons-material';

type ComponentProps = {
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
};

function InputPassword(props: ComponentProps) {
  return (
    <div>
      <TextField
        variant="standard"
        type="text"
        placeholder="Enter your password"
        {...props.register('password', {
          required: 'You must specify a password!',
          pattern: {
            value: /^(?=\D*\d)(?=.*?[a-zA-Z]).*[\W_].*$/i,
            message: 'Password should contain at least one number and one special character',
          },
          minLength: {
            value: 8,
            message: 'Password must be more than 8 characters',
          },
          maxLength: {
            value: 20,
            message: 'Password must be less than 20 characters',
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
      />
      {props.errors.password && <Alert severity="error">{props.errors.password.message}</Alert>}
    </div>
  );
}

export default InputPassword;
