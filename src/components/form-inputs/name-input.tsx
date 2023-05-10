import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { Alert, InputAdornment, TextField } from '@mui/material';

import { FormInputs } from '../../pages/sign-up/sign-up';
import { PersonOutline } from '@mui/icons-material';

type ComponentProps = {
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
};

function InputName(props: ComponentProps) {
  return (
    <div>
      <TextField
        variant="standard"
        type="text"
        placeholder="Enter your name (Jonh Dow)"
        {...props.register('name', {
          required: 'Enter your name!',
          pattern: {
            value:
              /^([A-Za-zА-Яа-яЁё]{2,}\s[A-Za-zА-Яа-яЁё]{1,}'?-?[A-Za-zА-Яа-яЁё]{2,}\s?([A-Za-zА-Яа-яЁё]{1,})?)$/i,
            message: 'Enter your firs name and last name with capital letters first - Jonh Dow',
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
      />
      {props.errors.name && <Alert severity="error">{props.errors.name.message}</Alert>}
    </div>
  );
}

export default InputName;
