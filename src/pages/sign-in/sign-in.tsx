import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { loginUser } from '../../store/user-slice';
import { setAuthError, removeAuthError } from '../../store/auth-error-slice';
import setErrorMessage from '../../common/error-message';

import InputEmail from '../../components/form-inputs/email-input';
import InputPassword from '../../components/form-inputs/password-input';

import { RootState } from 'store';
import { FormInputs } from '../../pages/sign-up/sign-up';

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
          dispatch(removeAuthError());
          handleLogin(data);
        })}
      >
        <InputEmail register={register} errors={errors} />
        <InputPassword register={register} errors={errors} />
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
