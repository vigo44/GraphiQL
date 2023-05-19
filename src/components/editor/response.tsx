import { Dispatch, SetStateAction } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';

import { Box, Paper, IconButton, Tooltip, Typography, LinearProgress } from '@mui/material';
import { ContentCopyRounded } from '@mui/icons-material';

import { useTranslation } from 'react-i18next';
import '../../i18nex';

type ComponentProps = {
  loading: boolean;
  codeResponse: undefined | string;
  setSnackOpen: Dispatch<SetStateAction<boolean>>;
};

function Response(props: ComponentProps) {
  const { t } = useTranslation();

  return (
    <Paper
      elevation={3}
      component="div"
      sx={{
        display: 'flex',
        width: { lg: '50%', md: '50%', sm: '100%', xs: '100%' },
        height: '100%',
        maxHeight: { lg: '100%', md: '100%', sm: 'calc(100vh - 90px)', xs: 'calc(100vh - 90px)' },
        minHeight: { lg: '', md: '', sm: '', xs: '100px' },
        p: {
          lg: '20px 0 20px 20px',
          md: '15px 0 15px 15px',
          sm: '10px 0 10px 10px',
          xs: '10px 0 10px 10px',
        },
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
          {t('editor.responesTitle')}
        </Typography>
        {props.loading ? (
          <Box
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#f5f5f5',
              border: '1px solid grey',
              borderRadius: '5px',
            }}
          >
            <LinearProgress sx={{ width: '100%' }} />
          </Box>
        ) : (
          <CodeEditor
            readOnly={true}
            value={props.codeResponse}
            language="json"
            placeholder={`${t('editor.requestPlaceholder')}`}
            padding={15}
            style={{
              width: '100%',
              height: '100%',
              fontSize: 14,
              backgroundColor: '#f5f5f5',
              fontFamily:
                'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
              border: '1px solid grey',
              borderRadius: '5px',
              overflow: 'auto',
            }}
          />
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '15%',
        }}
      >
        <Tooltip title={t('editor.btnCopy')} placement="left" arrow>
          <div>
            <IconButton
              onClick={() => {
                props.codeResponse && navigator.clipboard.writeText(props.codeResponse);
                props.setSnackOpen(true);
              }}
              disabled={props.codeResponse ? false : true}
            >
              <ContentCopyRounded />
            </IconButton>
          </div>
        </Tooltip>
      </Box>
    </Paper>
  );
}

export default Response;
