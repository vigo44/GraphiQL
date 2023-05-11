import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { FormInputs } from '../../pages/sign-up/sign-up';

type ComponentProps = {
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
};

function InputName(props: ComponentProps) {
  return (
    <div>
      <input
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
      />
      {props.errors.name && <span>{props.errors.name.message}</span>}
    </div>
  );
}

export default InputName;
