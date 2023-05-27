import { SetStateAction } from 'react';

import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { CloseFullscreenOutlined, OpenInFullOutlined } from '@mui/icons-material';

import { useTranslation } from 'react-i18next';
import '../../i18nex';

type ComponentProps = {
  setVariablesOpen: (value: SetStateAction<boolean>) => void;
  isVariablesOpen: boolean;
};

function VariablesHeader(props: ComponentProps) {
  const { t } = useTranslation();

  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        height: '10%',
      }}
    >
      <Box
        component="div"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          width: '85%',
        }}
      >
        <Typography
          variant="h4"
          component="h4"
          sx={{
            p: '5px 0',
            fontSize: { lg: '1.5rem', md: '1.4rem', sm: '1.3rem', xs: '1.2rem' },
          }}
        >
          {t('editor.varsTitle')}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '15%',
        }}
      >
        {props.isVariablesOpen ? (
          <Tooltip title={t('editor.btnCloseVars')} placement="left" arrow>
            <IconButton
              onClick={() =>
                props.isVariablesOpen ? props.setVariablesOpen(false) : props.setVariablesOpen(true)
              }
            >
              <CloseFullscreenOutlined />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title={t('editor.btnOpenVars')} placement="left" arrow>
            <IconButton
              onClick={() =>
                props.isVariablesOpen ? props.setVariablesOpen(false) : props.setVariablesOpen(true)
              }
            >
              <OpenInFullOutlined />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
}

export default VariablesHeader;
