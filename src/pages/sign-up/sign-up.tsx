import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { loginUser } from '../../store/user-slice';

type FormInputs = {
  email: string;
  password: string;
};

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (data: FormInputs) => {
    const auth = getAuth();
    console.log(data);

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        console.log(userCredential.user);
        dispatch(
          loginUser({
            email: userCredential.user.email,
            token: userCredential.user.refreshToken,
            id: userCredential.user.uid,
          })
        );
        navigate('/');
        alert('User Created Successfully');
      })
      .catch((error) => {
        console.log(error.code, error.message);
        alert('User created failed');
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
      <h1>Sign Up</h1>
      <form
        onSubmit={handleSubmit((data) => {
          handleRegister(data);
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
        <input className="formSubmit" type="submit" value="SIGN UP" />
      </form>
      <span>
        Or <Link to="/sign-in">login to your account</Link>
      </span>
    </div>
  );
}

export default SignUp;
