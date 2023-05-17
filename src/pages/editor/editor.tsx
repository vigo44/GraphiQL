import CodeEditor from '@uiw/react-textarea-code-editor';
import { ChangeEvent, useEffect, useState } from 'react';

import useLoadScheme from '../../hooks/load-scheme';
import useQueryGraphQL from '../../hooks/query-graphql';
import useValidationVaribles from '../../hooks/validation-variables';
import useValidationQuery from '../../hooks/validation-query';

import Documentation from '../../components/editor/documentation';

import { Box, IconButton, Tooltip, Typography } from '@mui/material';

import { useTranslation } from 'react-i18next';
import '../../i18nex';
import { Close } from '@mui/icons-material';

const defQuery = `query($name: String) {
  characters(page: 2, filter: { name: $name }) {
    info {
      count
    }
    results {
      name
    }
  }
  }`;

const defVars = `{
  "name": "rick",
  "page": 2
}`;

function Editor() {
  const { t } = useTranslation();
  const [codeQuery, setCodeQuery] = useState(defQuery);
  const [codeVars, setCodeVars] = useState(defVars);
  const [codeResponse, setCodeResponse] = useState<undefined | string>();
  const [codeDocs, setCodeDocs] = useState<undefined | string>();
  const [coloreQuery, setColoreQuery] = useState('#f5f5f5');
  const [coloreVars, setColoreVars] = useState('#f5f5f5');
  const [validation, setValidation] = useState<undefined | boolean>();
  const [errMessage, setErrMessage] = useState<undefined | string>();
  const [isVariablesOpen, setVariablesOpen] = useState(false);
  const [isDocsOpen, setDocsOpen] = useState(false);

  const { scheme, schemeDocs } = useLoadScheme('https://rickandmortyapi.com/graphql');
  const { response, error } = useQueryGraphQL(
    'https://rickandmortyapi.com/graphql',
    codeQuery,
    codeVars,
    validation
  );

  const { isValidVaribles, errValidVaribles } = useValidationVaribles(codeVars);
  const { isValidQuery } = useValidationQuery(codeQuery, scheme);

  useEffect(() => {
    if (isValidVaribles) {
      setColoreVars('#ACE1AF');
    } else if (isValidVaribles === false) {
      setColoreVars('#FFD6D6');
    } else {
      setColoreVars('#f5f5f5');
    }
  }, [isValidVaribles]);

  useEffect(() => {
    if (isValidQuery) {
      setColoreQuery('#ACE1AF');
    } else if (isValidQuery === false) {
      setColoreQuery('#FFD6D6');
    } else {
      setColoreQuery('#f5f5f5');
    }
  }, [isValidQuery]);

  useEffect(() => {
    if (error) {
      setCodeResponse(error);
    } else if (errMessage) {
      setCodeResponse(errMessage);
    } else {
      setCodeResponse(response);
    }
  }, [response, error, errMessage]);

  function handlerClickDocs() {
    setDocsOpen(true);
    setCodeDocs(schemeDocs);
  }

  function handlerClick() {
    if (isValidVaribles === false) {
      setErrMessage(errValidVaribles);
    } else {
      setValidation(true);
      setErrMessage(undefined);
    }
  }

  function handlerOnChangeQuery(evn: ChangeEvent<HTMLTextAreaElement>) {
    setCodeQuery(evn.target.value);
    setValidation(false);
  }

  function handlerOnChangeVars(evn: ChangeEvent<HTMLTextAreaElement>) {
    setCodeVars(evn.target.value);
    setValidation(false);
  }

  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: { lg: 'row', md: 'row', sm: 'column', xs: 'column' },
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        maxWidth: '1080px',
        height: { lg: '570px', md: '400px', sm: 'fit-content', xs: 'fit-content' },
        marginBottom: '20px',
      }}
    >
      <Documentation
        codeDocs={codeDocs}
        isDocsOpen={isDocsOpen}
        setDocsOpen={setDocsOpen}
      ></Documentation>
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
            width: '80%',
          }}
        >
          <Box
            component="div"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: isVariablesOpen ? '70%' : '100%',
            }}
          >
            <Typography
              variant="h4"
              component="h4"
              sx={{
                fontSize: { lg: '1.5rem', md: '1.4rem', sm: '1.3rem', xs: '1.2rem' },
              }}
            >
              {t('editor.queryTitle')}
            </Typography>
            <CodeEditor
              value={codeQuery}
              language="graphql"
              placeholder=""
              onChange={handlerOnChangeQuery}
              padding={15}
              style={{
                height: '100%',
                fontSize: 12,
                backgroundColor: `${coloreQuery}`,
                fontFamily:
                  'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                overflow: 'auto',
              }}
            />
          </Box>
          <Box
            component="div"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: isVariablesOpen ? '30%' : '0',
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
                  fontSize: { lg: '1.5rem', md: '1.4rem', sm: '1.3rem', xs: '1.2rem' },
                }}
              >
                {t('editor.varsTitle')}
              </Typography>
              <IconButton
                onClick={() => (isVariablesOpen ? setVariablesOpen(false) : setVariablesOpen(true))}
              >
                <Close />
              </IconButton>
            </Box>
            <CodeEditor
              value={codeVars}
              language="json"
              placeholder=""
              onChange={handlerOnChangeVars}
              padding={15}
              style={{
                width: '100%',
                height: '100%',
                fontSize: 12,
                backgroundColor: `${coloreVars}`,
                fontFamily:
                  'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
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
            width: '20%',
          }}
        >
          <Tooltip title={t('editor.btnShowDocs')} placement="left" arrow>
            <IconButton onClick={() => handlerClickDocs()}>
              <Close />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('editor.btnShowRespones')} placement="left" arrow>
            <IconButton onClick={() => handlerClick()}>
              <Close />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('editor.btnClear')} placement="left" arrow>
            <IconButton>
              <Close />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('editor.btnCopy')} placement="left" arrow>
            <IconButton>
              <Close />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
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
            width: '80%',
          }}
        >
          <Typography
            variant="h4"
            component="h4"
            sx={{
              fontSize: { lg: '1.5rem', md: '1.4rem', sm: '1.3rem', xs: '1.2rem' },
            }}
          >
            {t('editor.responesTitle')}
          </Typography>
          <CodeEditor
            readOnly={true}
            value={codeResponse}
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
            width: '20%',
          }}
        >
          <Tooltip title={t('editor.btnClear')} placement="left" arrow>
            <IconButton>
              <Close />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('editor.btnCopy')} placement="left" arrow>
            <IconButton>
              <Close />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}

export default Editor;
