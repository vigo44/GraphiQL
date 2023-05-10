import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { InputAdornment, TextField } from '@mui/material';
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
        variant="outlined"
        size="small"
        label="Email"
        type="text"
        placeholder="Enter your email"
        {...props.register('email', {
          required: '*Email is Required!',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: '*Invalid email address',
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
        helperText={props.errors.email ? props.errors.email.message : '*mail@test.com'}
      />
    </div>
  );
}

export default InputEmail;
