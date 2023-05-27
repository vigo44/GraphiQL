import { Dispatch, SetStateAction } from 'react';

import { Box, Chip, IconButton, Stack, SwipeableDrawer, Typography } from '@mui/material';
import { Close, Brightness1 } from '@mui/icons-material';

import APIDocs from './docs';

import { useTranslation } from 'react-i18next';
import '../../i18nex';

import { Docs } from '../../pages/editor/editor';

type ComponentProps = {
  docs: Docs[] | undefined;
  isDocsOpen: boolean;
  setDocsOpen: Dispatch<SetStateAction<boolean>>;
};

function Documentation(props: ComponentProps) {
  const { t } = useTranslation();

  return (
    <SwipeableDrawer
      open={props.isDocsOpen}
      onClose={() => props.setDocsOpen(false)}
      onOpen={() => props.setDocsOpen(true)}
      sx={{ touchAction: 'none' }}
    >
      <Box
        component="div"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          width: { lg: '600px', md: '500px', sm: '400px', xs: 'fit-content' },
          gap: '20px',
          p: '20px',
        }}
      >
        <Box
          component="div"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography
            variant="h4"
            component="h4"
            sx={{
              textAlign: 'center',
              fontSize: { lg: '1.5rem', md: '1.4rem', sm: '1.3rem', xs: '1.2rem' },
            }}
          >
            {t('editor.docsTitle')}
          </Typography>
          <IconButton onClick={() => props.setDocsOpen(false)}>
            <Close />
          </IconButton>
        </Box>
        <Typography variant="body1" component="h5">
          {t('editor.docsValidationTitle')}
        </Typography>
        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: '15px' }}>
          <Chip
            icon={
              <Brightness1
                style={{ color: '#F0FFF0', border: '1px solid gray', borderRadius: '50%' }}
              />
            }
            label={t('editor.docsValidationTrue')}
            variant="outlined"
          />
          <Chip
            icon={
              <Brightness1
                style={{ color: '#FFE4E1', border: '1px solid gray', borderRadius: '50%' }}
              />
            }
            label={t('editor.docsValidationFalse')}
            variant="outlined"
          />
          <Chip
            icon={
              <Brightness1
                style={{ color: '#F5F5F5', border: '1px solid gray', borderRadius: '50%' }}
              />
            }
            label={t('editor.docsValidationEmpty')}
            variant="outlined"
          />
        </Stack>
        <APIDocs docs={props.docs}></APIDocs>
      </Box>
    </SwipeableDrawer>
  );
}

export default Documentation;
