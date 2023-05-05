import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { loginUser } from '../../store/user-slice';
import { setAuthError, removeAuthError } from '../../store/auth-error-slice';

import { RootState } from 'store';

type FormInputs = {
  email: string;
  password: string;
};

function SignIn() {
  const dispatch = useDispatch();
  const authError = useSelector((state: RootState) => state.authError);

  const handleLogin = (data: FormInputs) => {
    const auth = getAuth();

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
        dispatch(
          setAuthError({
            error: error.message,
          })
        );
      });
  };

  useEffect(() => {
    dispatch(removeAuthError());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  return (
    <div>
      <h1>Sign In</h1>
      <form
        onSubmit={handleSubmit((data) => {
          handleLogin(data);
        })}
      >
        <input
          type="text"
          placeholder="Enter your email"
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
          placeholder="Enter your password"
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
        <input className="formSubmit" type="submit" value="SIGN IN" />
      </form>
      <span>
        Or <Link to="/sign-up">create new account</Link>
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

export default SignIn;
