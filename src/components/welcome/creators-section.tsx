import { Box, Typography } from '@mui/material';
import DeveloperCard from '../../components/card/card';

import palaceholder from '../../assets/placeholder.jpg';

function CreatorsSection() {
  return (
    <Box
      component="section"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        width: '100%',
      }}
    >
      <Typography variant="h4" component="h3">
        Developers
      </Typography>
      <Box
        component="div"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '20px',
          width: 'fit-content',
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

export default CreatorsSection;
