import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { FormInputs } from '../../pages/sign-up/sign-up';

type ComponentProps = {
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
};

function InputPassword(props: ComponentProps) {
  return (
    <div>
      <input
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
      />
      {props.errors.password && <span>{props.errors.password.message}</span>}
    </div>
  );
}

export default InputPassword;
