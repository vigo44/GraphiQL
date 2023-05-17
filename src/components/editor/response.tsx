import CodeEditor from '@uiw/react-textarea-code-editor';

import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { DeleteOutlineRounded, ContentCopyRounded } from '@mui/icons-material';

import { useTranslation } from 'react-i18next';
import '../../i18nex';

type ComponentProps = {
  codeResponse: undefined | string;
};

function Response(props: ComponentProps) {
  const { t } = useTranslation();

  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        width: { lg: '50%', md: '50%', sm: '100%', xs: '100%' },
        height: '100%',
        p: { lg: '10px', md: '10px', sm: '10px 0', xs: '10px 0' },
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
        <CodeEditor
          readOnly={true}
          value={props.codeResponse}
          language="json"
          placeholder=""
          padding={15}
          style={{
            width: '100%',
            height: '100%',
            fontSize: 12,
            backgroundColor: '#f5f5f5',
            fontFamily:
              'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            overflow: 'auto',
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '15%',
        }}
      >
        <Tooltip title={t('editor.btnClear')} placement="left" arrow>
          <IconButton>
            <DeleteOutlineRounded />
          </IconButton>
        </Tooltip>
        <Tooltip title={t('editor.btnCopy')} placement="left" arrow>
          <IconButton>
            <ContentCopyRounded />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default Response;
