import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { loginUser } from '../store/user-slice';

export function CheckAuth() {
  const dispatch = useDispatch();
  const { email, token, id } = useSelector((state: RootState) => state.user);
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(
        loginUser({
          email: user.email,
          token: user.refreshToken,
          id: user.uid,
        })
      );
    }
  });

  return {
    isAuth: !!id,
    email,
    token,
    id,
  };
}
