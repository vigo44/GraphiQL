import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { Alert, InputAdornment, TextField } from '@mui/material';
import { MailOutline } from '@mui/icons-material';

import { FormInputs } from '../../pages/sign-up/sign-up';

type ComponentProps = {
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
};

function InputEmail(props: ComponentProps) {
  return (
    <div>
      <TextField
        variant="standard"
        type="text"
        placeholder="Enter your email"
        {...props.register('email', {
          required: 'Email is Required!',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
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
      />
      {props.errors.email && <Alert severity="error">{props.errors.email.message}</Alert>}
    </div>
  );
}

export default InputEmail;
