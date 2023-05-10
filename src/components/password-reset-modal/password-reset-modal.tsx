import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPassResetModalClose } from '../../store/password-reset-modal-slice';

function PasswordResetModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div>
      <span>Success! Check your email to reset your password.</span>
      <button
        onClick={() => {
          dispatch(setPassResetModalClose());
          navigate('/sign-in');
        }}
      >
        SIGN IN
      </button>
    </div>
  );
}

export default PasswordResetModal;
