import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CheckAuth } from '../../hooks/check-auth';

import { Box, Button, ButtonGroup, Typography } from '@mui/material';
import DeveloperCard from '../../components/card/card';

import { RootState } from '../../store';

import palaceholder from '../../assets/placeholder.jpg';

function Welcome() {
  const navigate = useNavigate();
  const { isAuth } = CheckAuth();
  const name = useSelector((state: RootState) => state.user.name);

  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
      }}
    >
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
        <Typography variant="body1" component="p" sx={{ width: '60%', textAlign: 'center' }}>
          GraphiQL is the GraphQL integrated development environment (IDE). It’s a powerful (and
          all-around awesome) tool you’ll use often while building Gatsby websites. It offers syntax
          highlighting, intellisense autocompletion, automatic documentation, and much more.
        </Typography>
        <Typography variant="body1" component="p" sx={{ width: '60%', textAlign: 'center' }}>
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
      <Box
        component="section"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          width: '100%',
        }}
      >
        <DeveloperCard
          img={palaceholder}
          name="vigo44"
          description="Team Lead"
          githubLink="https://github.com/vigo44"
        />
        <DeveloperCard
          img={palaceholder}
          name="Spektar001"
          description="Frontend Developer"
          githubLink="https://github.com/Spektar001"
        />
        <DeveloperCard
          img={palaceholder}
          name="LoginamNet"
          description="Frontend Developer"
          githubLink="https://github.com/LoginamNet"
        />
      </Box>
    </Box>
  );
}

export default Welcome;
