import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { FormInputs } from '../../pages/sign-up/sign-up';

type ComponentProps = {
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
};

function InputEmail(props: ComponentProps) {
  return (
    <div>
      <input
        type="text"
        placeholder="Enter your email"
        {...props.register('email', {
          required: 'Email is Required!',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        })}
      />
      {props.errors.email && <span>{props.errors.email.message}</span>}
    </div>
  );
}

export default InputEmail;
