import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, update, get, child } from 'firebase/database';
import { loginUser } from '../../store/user-slice';

type FormInputs = {
  email: string;
  password: string;
};

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (data: FormInputs) => {
    const auth = getAuth();
    const database = getDatabase();
    const date = new Date();
    const dbRef = ref(getDatabase());

    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        update(ref(database, 'users/' + userCredential.user.uid), {
          last_login: date,
        });
        get(child(dbRef, `users/${userCredential.user.uid}`)).then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            dispatch(
              loginUser({
                email: userCredential.user.email,
                token: userCredential.user.refreshToken,
                id: userCredential.user.uid,
                name: data.name,
              })
            );
          } else {
            console.log('No data available');
          }
        });
        navigate('/');
        alert('User Login Successfull');
      })
      .catch((error) => {
        console.log(error.code, error.message);
        alert('User Login failed');
        alert(error);
      });
  };

  const {
    register,
    handleSubmit,
    reset,
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
          reset();
        })}
      >
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
        <input className="formSubmit" type="submit" value="SIGN IN" />
      </form>
      <span>
        Or <Link to="/sign-up">create new account</Link>
      </span>
    </div>
  );
}

export default SignIn;
