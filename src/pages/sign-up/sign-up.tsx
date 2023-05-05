import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { loginUser } from '../../store/user-slice';
import { setAuthError, removeAuthError } from '../../store/auth-error-slice';

import { RootState } from 'store';

type FormInputs = {
  email: string;
  password: string;
  confirm_password: string;
  name: string;
};

function SignUp() {
  const dispatch = useDispatch();
  const authError = useSelector((state: RootState) => state.authError);

  const handleRegister = (data: FormInputs) => {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        updateProfile(userCredential.user, {
          displayName: data.name,
        });

        signInWithEmailAndPassword(auth, data.email, data.password)
          .then((userCredential) => {
            dispatch(
              loginUser({
                email: userCredential.user.email,
                token: userCredential.user.refreshToken,
                id: userCredential.user.uid,
                name: userCredential.user.displayName,
              })
            );
          })
          .catch((error) => {
            console.log(error.code, error.message);
            alert('User Login failed');
          });
      })
      .catch((error) => {
        console.log(error.code, error.message);
        dispatch(
          setAuthError({
            error: error.message,
          })
        );
      });
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  return (
    <div>
      <h1>Sign Up</h1>
      <form
        onSubmit={handleSubmit((data) => {
          handleRegister(data);
        })}
      >
        <input
          type="text"
          {...register('name', {
            required: 'Enter your name!',
            pattern: {
              value:
                /^([A-Za-zА-Яа-яЁё]{2,}\s[A-Za-zА-Яа-яЁё]{1,}'?-?[A-Za-zА-Яа-яЁё]{2,}\s?([A-Za-zА-Яа-яЁё]{1,})?)$/i,
              message: 'Enter your firs name and last name with capital letters first - Jonh Dow',
            },
          })}
        />
        {errors.name && <span>{errors.name.message}</span>}
        <input
          type="text"
          {...register('email', {
            required: 'Email is Required!',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
        <input
          type="text"
          {...register('password', {
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
        {errors.password && <span>{errors.password.message}</span>}
        <input
          type="text"
          {...register('confirm_password', {
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
              if (watch('password') != val) {
                return 'Your passwords do no match';
              }
            },
          })}
        />
        {errors.confirm_password && <span>{errors.confirm_password.message}</span>}
        <input className="formSubmit" type="submit" value="SIGN UP" />
      </form>
      <span>
        Or <Link to="/sign-in">login to your account</Link>
      </span>
      {authError.error && (
        <div>
          <span>{authError.error}</span>
          <button onClick={() => dispatch(removeAuthError())}>X</button>
        </div>
      )}
    </div>
  );
}

export default SignUp;
