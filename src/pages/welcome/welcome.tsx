import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CheckAuth } from '../../hooks/check-auth';

import { Button, ButtonGroup, Typography } from '@mui/material';

import { RootState } from '../../store';

function Welcome() {
  const navigate = useNavigate();
  const { isAuth } = CheckAuth();
  const name = useSelector((state: RootState) => state.user.name);

  return (
    <div>
      <Typography
        variant="h2"
        component="h1"
        sx={{
          alignSelf: 'flex-start',
        }}
      >
        Welcome{isAuth && `, ${name}`}
      </Typography>
      {isAuth ? (
        <Button variant="outlined" onClick={() => navigate('/')}>
          Go to Editor
        </Button>
      ) : (
        <ButtonGroup variant="outlined" size="large">
          <Button onClick={() => navigate('/sign-in')}>Sing In</Button>
          <Button onClick={() => navigate('/sign-up')}>Sing Up</Button>
        </ButtonGroup>
      )}
    </div>
  );
}

export default Welcome;
