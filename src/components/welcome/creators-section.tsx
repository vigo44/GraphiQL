import { Box, Typography } from '@mui/material';
import DeveloperCard from '../../components/card/card';

import vigo_avatar from '../../assets/vigo_avatar.jpg';
import spectar_avatar from '../../assets/spectar_avatar.jpg';
import loginanet_avatar from '../../assets/loginanet_avatar.jpg';

import { useTranslation } from 'react-i18next';
import '../../i18nex';

function CreatorsSection() {
  const { t } = useTranslation();
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
        {t('creatorsSection.title')}
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
          img={vigo_avatar}
          name="vigo44"
          description="Team Lead"
          chips={[t('creators.chipManage'), t('creators.chipGraph'), t('creators.chipTest')]}
          githubLink="https://github.com/vigo44"
        />
        <DeveloperCard
          img={spectar_avatar}
          name="Spektar001"
          description="Frontend Developer"
          chips={[t('creators.chipTranslate'), t('creators.chipMui'), t('creators.chipGraph')]}
          githubLink="https://github.com/Spektar001"
        />
        <DeveloperCard
          img={loginanet_avatar}
          name="LoginamNet"
          description="Frontend Developer"
          chips={[t('creators.chipDesign'), t('creators.chipAuth'), t('creators.chipMui')]}
          githubLink="https://github.com/LoginamNet"
        />
      </Box>
    </Box>
  );
}

export default CreatorsSection;
