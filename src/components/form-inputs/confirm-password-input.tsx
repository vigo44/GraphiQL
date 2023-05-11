import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';

import { FormInputs } from '../../pages/sign-up/sign-up';

type ComponentProps = {
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
  watch: UseFormWatch<FormInputs>;
};

function InputConfirmPassword(props: ComponentProps) {
  return (
    <div>
      <input
        type="text"
        placeholder="Repeat your password"
        {...props.register('confirm_password', {
          required: 'Please, repeat your password!',
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
          validate: (val: string) => {
            if (props.watch('password') != val) {
              return 'Your passwords do no match';
            }
          },
        })}
      />
      {props.errors.confirm_password && <span>{props.errors.confirm_password.message}</span>}
    </div>
  );
}

export default InputConfirmPassword;
