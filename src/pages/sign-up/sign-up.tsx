import { useEffect } from 'react';
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
import setErrorMessage from '../../common/error-message';

import InputName from '../../components/form-inputs/name-input';
import InputEmail from '../../components/form-inputs/email-input';
import InputPassword from '../../components/form-inputs/password-input';
import InputConfirmPassword from '../../components/form-inputs/confirm-password-input';

import { RootState } from 'store';

export type FormInputs = {
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

        signInWithEmailAndPassword(auth, data.email, data.password).then((userCredential) => {
          dispatch(
            loginUser({
              email: userCredential.user.email,
              token: userCredential.user.refreshToken,
              id: userCredential.user.uid,
              name: userCredential.user.displayName,
            })
          );
        });
      })
      .catch((error) => {
        dispatch(
          setAuthError({
            error: setErrorMessage(error.code),
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
          dispatch(removeAuthError());
          handleRegister(data);
        })}
      >
        <InputName register={register} errors={errors} />
        <InputEmail register={register} errors={errors} />
        <InputPassword register={register} errors={errors} />
        <InputConfirmPassword register={register} errors={errors} watch={watch} />
        <input className="formSubmit" type="submit" value="SIGN UP" />
      </form>
      <span>
        Or <Link to="/sign-in">login to your account</Link>
      </span>
      <span>
        <Link to="/pass-reset">Forgot your password?</Link>
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
