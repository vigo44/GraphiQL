import CodeEditor from '@uiw/react-textarea-code-editor';
import { Dispatch, SetStateAction } from 'react';

import { Box, IconButton, SwipeableDrawer, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';

import { useTranslation } from 'react-i18next';
import '../../i18nex';

type ComponentProps = {
  codeDocs: string | undefined;
  isDocsOpen: boolean;
  setDocsOpen: Dispatch<SetStateAction<boolean>>;
};

function Documentation(props: ComponentProps) {
  const { t } = useTranslation();

  return (
    <SwipeableDrawer
      open={props.isDocsOpen}
      onClose={() => props.setDocsOpen(false)}
      onOpen={() => props.setDocsOpen(false)}
    >
      <Box
        component="div"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
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
              fontSize: { lg: '2.1rem', md: '1.9rem', sm: '1.7rem', xs: '1.5rem' },
            }}
          >
            {t('editor.docsTitle')}
          </Typography>
          <IconButton onClick={() => props.setDocsOpen(false)}>
            <Close
              sx={{
                fontSize: { lg: '2.1rem', md: '1.9rem', sm: '1.7rem', xs: '1.7rem' },
              }}
            />
          </IconButton>
        </Box>
        <CodeEditor
          readOnly={true}
          value={props.codeDocs}
          language="graphql"
          placeholder=""
          padding={15}
          style={{
            fontSize: 12,
            backgroundColor: '#f5f5f5',
            fontFamily:
              'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          }}
        />
      </Box>
    </SwipeableDrawer>
  );
}

export default Documentation;
