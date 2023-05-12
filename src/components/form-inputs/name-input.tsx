import { useDispatch } from 'react-redux';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { removeAuthError } from '../../store/auth-error-slice';

import { InputAdornment, TextField } from '@mui/material';

import { FormInputs } from '../../pages/sign-up/sign-up';
import { PersonOutline } from '@mui/icons-material';

type ComponentProps = {
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
};

function InputName(props: ComponentProps) {
  const dispatch = useDispatch();

  return (
    <div>
      <TextField
        variant="outlined"
        size="small"
        label="Name"
        type="text"
        placeholder="Enter your name"
        {...props.register('name', {
          required: '*Enter your name!',
          pattern: {
            value:
              /^([A-Za-zА-Яа-яЁё]{2,}\s[A-Za-zА-Яа-яЁё]{1,}'?-?[A-Za-zА-Яа-яЁё]{2,}\s?([A-Za-zА-Яа-яЁё]{1,})?)$/i,
            message: '*Enter your firs name and last name with capital letters first - Jonh Dow',
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
        onChange={() => dispatch(removeAuthError())}
      />
    </div>
  );
}

export default InputName;
