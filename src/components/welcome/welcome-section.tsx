import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CheckAuth } from '../../hooks/check-auth';

import { Box, Button, ButtonGroup, Typography } from '@mui/material';

import { RootState } from '../../store';

function WelcomeSection() {
  const navigate = useNavigate();
  const { isAuth } = CheckAuth();
  const name = useSelector((state: RootState) => state.user.name);

  return (
    <Box
      component="section"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '15px',
        minHeight: 'calc(100vh - 50px)',
      }}
    >
      <Typography variant="h2" component="h1">
        Welcome{isAuth && `, ${name}`}
      </Typography>
      <Typography variant="h4" component="h4">
        What is GraphiQL?
      </Typography>
      <Typography
        variant="body1"
        component="p"
        sx={{ width: { lg: '60%', md: '70%', sm: '80%', xs: '90%' }, textAlign: 'center' }}
      >
        GraphiQL is the GraphQL integrated development environment (IDE). It’s a powerful (and
        all-around awesome) tool you’ll use often while building Gatsby websites. It offers syntax
        highlighting, intellisense autocompletion, automatic documentation, and much more.
      </Typography>
      <Typography
        variant="body1"
        component="p"
        sx={{ width: { lg: '60%', md: '70%', sm: '80%', xs: '90%' }, textAlign: 'center' }}
      >
        Use GraphiQL to interactively build your page and static queries.
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
    </Box>
  );
}

export default WelcomeSection;
