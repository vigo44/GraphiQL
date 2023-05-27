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
  hadlerOnClearQuery: () => void;
  handlerSetDefaultValues: () => void;
  handlerOnChangeQuery(evn: ChangeEvent<HTMLTextAreaElement>): void;
  handlerClickDocs(): void;
  handlerClick(): void;
  setSnackOpen: Dispatch<SetStateAction<boolean>>;
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
          minHeight: { lg: '', md: '', sm: '250px', xs: '250px' },
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
            placeholder={`${t('editor.queryPlaceholder')}
            ${DEF_EDITOR_VALUES.QUERY_PLACEHOLDER}`}
            onChange={props.handlerOnChangeQuery}
            padding={15}
            style={{
              alignItems: 'flex-start',
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
          <div>
            <IconButton
              onClick={() => props.handlerClick()}
              disabled={props.codeQuery ? false : true}
            >
              <SlowMotionVideoOutlined
                color={props.codeQuery ? 'primary' : 'disabled'}
                fontSize="large"
              />
            </IconButton>
          </div>
        </Tooltip>
        <Tooltip title={t('editor.btnShowDocs')} placement="left" arrow>
          <IconButton onClick={() => props.handlerClickDocs()}>
            <PlagiarismOutlined />
          </IconButton>
        </Tooltip>
        <Tooltip title={t('editor.btnClear')} placement="left" arrow>
          <div>
            <IconButton
              onClick={() => props.hadlerOnClearQuery()}
              disabled={props.codeQuery ? false : true}
            >
              <DeleteOutlineRounded />
            </IconButton>
          </div>
        </Tooltip>
        <Tooltip title={t('editor.btnCopy')} placement="left" arrow>
          <div>
            <IconButton
              onClick={() => {
                navigator.clipboard.writeText(props.codeQuery);
                props.setSnackOpen(true);
              }}
              disabled={props.codeQuery ? false : true}
            >
              <ContentCopyRounded />
            </IconButton>
          </div>
        </Tooltip>
        <Tooltip title={t('editor.btnSetTestValues')} placement="left" arrow>
          <IconButton onClick={() => props.handlerSetDefaultValues()}>
            <DashboardCustomizeOutlined />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default Query;
