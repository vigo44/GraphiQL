import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CheckAuth } from '../../hooks/check-auth';

import { RootState } from '../../store';

function Welcome() {
  const navigate = useNavigate();
  const { isAuth } = CheckAuth();
  const name = useSelector((state: RootState) => state.user.name);

  return (
    <div>
      <h1>Welcome{isAuth && `, ${name}`}</h1>
      {isAuth ? (
        <button onClick={() => navigate('/')}>Go to Editor</button>
      ) : (
        <>
          <button onClick={() => navigate('/sign-in')}>Sing In</button>
          <button onClick={() => navigate('/sign-up')}>Sing Up</button>
        </>
      )}
    </div>
  );
}

export default Welcome;
