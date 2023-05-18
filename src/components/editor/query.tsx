import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';

import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import {
  PlagiarismOutlined,
  SlowMotionVideoOutlined,
  DeleteOutlineRounded,
  ContentCopyRounded,
  DashboardCustomizeOutlined,
} from '@mui/icons-material';

import { useTranslation } from 'react-i18next';
import '../../i18nex';

import { DEF_EDITOR_VALUES } from '../../common/constants';

type ComponentProps = {
  coloreQuery: string;
  codeQuery: string;
  setCodeQuery: Dispatch<SetStateAction<string>>;
  setCodeVars: Dispatch<SetStateAction<string>>;
  handlerOnChangeQuery(evn: ChangeEvent<HTMLTextAreaElement>): void;
  handlerClickDocs(): void;
  handlerClick(): void;
  isVariablesOpen: boolean;
};

function Query(props: ComponentProps) {
  const { t } = useTranslation();

  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        height: props.isVariablesOpen ? '60%' : '90%',
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
        <Box
          component="div"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
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
            {t('editor.queryTitle')}
          </Typography>
          <CodeEditor
            value={props.codeQuery}
            language="graphql"
            placeholder=""
            onChange={props.handlerOnChangeQuery}
            padding={15}
            style={{
              height: '100%',
              fontSize: 14,
              backgroundColor: `${props.coloreQuery}`,
              fontFamily:
                'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
              border: '1px solid grey',
              borderRadius: '5px',
              overflow: 'auto',
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '15%',
        }}
      >
        <Tooltip title={t('editor.btnShowRespones')} placement="left" arrow>
          <IconButton onClick={() => props.handlerClick()}>
            <SlowMotionVideoOutlined color="primary" fontSize="large" />
          </IconButton>
        </Tooltip>
        <Tooltip title={t('editor.btnShowDocs')} placement="left" arrow>
          <IconButton onClick={() => props.handlerClickDocs()}>
            <PlagiarismOutlined />
          </IconButton>
        </Tooltip>
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
        <Tooltip title={t('editor.btnSetTestValues')} placement="left" arrow>
          <IconButton
            onClick={() => {
              props.setCodeQuery(DEF_EDITOR_VALUES.QUERY);
              props.setCodeVars(DEF_EDITOR_VALUES.VARIABLES);
            }}
          >
            <DashboardCustomizeOutlined />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default Query;
