import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CheckAuth } from '../../hooks/check-auth';

import { Button } from '@mui/material';

import { RootState } from '../../store';

function Welcome() {
  const navigate = useNavigate();
  const { isAuth } = CheckAuth();
  const name = useSelector((state: RootState) => state.user.name);

  return (
    <div>
      <h1>Welcome{isAuth && `, ${name}`}</h1>
      {isAuth ? (
        <Button variant="outlined" onClick={() => navigate('/')}>
          Go to Editor
        </Button>
      ) : (
        <>
          <Button variant="outlined" onClick={() => navigate('/sign-in')}>
            Sing In
          </Button>
          <Button variant="outlined" onClick={() => navigate('/sign-up')}>
            Sing Up
          </Button>
        </>
      )}
    </div>
  );
}

export default Welcome;
