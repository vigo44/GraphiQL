import { ChangeEvent, useEffect, useState } from 'react';
import { getIntrospectionQuery } from 'graphql';

import useLoadScheme from '../../hooks/load-scheme';
import useQueryGraphQL from '../../hooks/query-graphql';
import useValidationVaribles from '../../hooks/validation-variables';
import useValidationQuery from '../../hooks/validation-query';

import Documentation from '../../components/editor/documentation';
import VariablesHeader from '../../components/editor/variables-header';
import Variables from '../../components/editor/variables';
import Query from '../../components/editor/query';
import Response from '../../components/editor/response';

import { Alert, Box, Paper, Snackbar } from '@mui/material';

import { DEF_EDITOR_VALUES } from '../../common/constants';

import { useTranslation } from 'react-i18next';
import '../../i18nex';

export type Docs = {
  name: string;
  description: string;
  fields: Fields[];
  inputFields: InputFields[];
  args: Args[];
  type: {
    name: string | null;
    kind: string;
    ofType: { kind: string; name: string | null; ofType: { kind: string; name: string | null } };
  };
};

type InputFields = {
  name: string;
  description: string;
  type: { kind: string; name: string | null };
};

type Fields = {
  name: string;
  description: string;
  args: Args[];
  type: {
    kind: string;
    name: string;
    ofType: { kind: string; name: string | null; ofType: { name: string | null } };
  };
};

type Args = {
  name: string;
  description: string;
  type: {
    kind: string;
    name: string | null;
    ofType: {
      kind: string;
      name: string | null;
      ofType: { kind: string; name: string | null; ofType: { kind: string; name: string | null } };
    };
  };
};

function Editor() {
  const { t } = useTranslation();
  const [codeQuery, setCodeQuery] = useState('');
  const [codeVars, setCodeVars] = useState('');
  const [codeResponse, setCodeResponse] = useState<undefined | string>();
  const [coloreQuery, setColoreQuery] = useState('#f5f5f5');
  const [coloreVars, setColoreVars] = useState('#f5f5f5');
  const [validation, setValidation] = useState<undefined | boolean>();
  const [errMessage, setErrMessage] = useState<undefined | string>();
  const [isVariablesOpen, setVariablesOpen] = useState(true);
  const [docs, setDocs] = useState<undefined | Docs[]>();
  const [isDocsOpen, setDocsOpen] = useState(false);
  const [isSnackOpen, setSnackOpen] = useState(false);

  const { scheme } = useLoadScheme('https://rickandmortyapi.com/graphql');
  const { loading, response, error } = useQueryGraphQL(
    'https://rickandmortyapi.com/graphql',
    codeQuery,
    codeVars,
    validation
  );

  const { isValidVaribles, errValidVaribles } = useValidationVaribles(codeVars);
  const { isValidQuery } = useValidationQuery(codeQuery, scheme);

  const getDocs = async (path: RequestInfo | URL) => {
    try {
      const response = await fetch(path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: getIntrospectionQuery() as string,
        }),
      });
      if (response.ok) {
        const jsonData = await response.json();
        const queryArr = jsonData.data.__schema.types;

        setDocs(queryArr);
      } else {
        const errorFetch = new Error(`Network Error: response ${response.status}`);
        throw errorFetch;
      }
    } catch (err: unknown) {
      console.error(err);
    }
  };

  const handlerClickDocs = () => {
    getDocs('https://rickandmortyapi.com/graphql');
    setDocsOpen(true);
  };

  const handlerClick = () => {
    if (isValidVaribles === false) {
      setErrMessage(errValidVaribles);
    } else {
      setValidation(true);
      setErrMessage(undefined);
    }
  };

  const handlerOnChangeQuery = (evn: ChangeEvent<HTMLTextAreaElement>) => {
    setCodeQuery(evn.target.value);
    setValidation(false);
  };

  const hadlerOnClearQuery = () => {
    setCodeQuery('');
    setValidation(undefined);
  };

  const handlerOnChangeVars = (evn: ChangeEvent<HTMLTextAreaElement>) => {
    setCodeVars(evn.target.value);
    setValidation(false);
  };

  const hadlerOnClearVars = () => {
    setCodeVars('');
    setValidation(undefined);
  };

  const handlerSetDefaultValues = () => {
    setCodeQuery(DEF_EDITOR_VALUES.QUERY);
    setCodeVars(DEF_EDITOR_VALUES.VARIABLES);
    setValidation(false);
  };

  useEffect(() => {
    if (isValidVaribles) {
      setColoreVars('#F0FFF0');
    } else if (isValidVaribles === false) {
      setColoreVars('#FFE4E1');
    } else {
      setColoreVars('#F5F5F5');
    }
  }, [isValidVaribles]);

  useEffect(() => {
    if (isValidQuery) {
      setColoreQuery('#F0FFF0');
    } else if (isValidQuery === false) {
      setColoreQuery('#FFE4E1');
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

  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: { lg: 'row', md: 'row', sm: 'column', xs: 'column' },
        justifyContent: 'center',
        alignItems: 'center',
        gap: '15px',
        width: { lg: '90%', md: '90%', sm: '90%', xs: '100%' },
        maxWidth: '1080px',
        height: { lg: '650px', md: '430px', sm: 'fit-content', xs: 'fit-content' },
        marginBottom: '20px',
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isSnackOpen}
        autoHideDuration={2000}
        onClose={() => setSnackOpen(false)}
      >
        <Alert onClose={() => setSnackOpen(false)} severity="success" sx={{ width: '100%' }}>
          {t('editor.copySnack')}
        </Alert>
      </Snackbar>
      <Documentation docs={docs} isDocsOpen={isDocsOpen} setDocsOpen={setDocsOpen}></Documentation>
      <Paper
        elevation={3}
        component="div"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: { lg: '50%', md: '50%', sm: '100%', xs: '100%' },
          height: '100%',
          p: {
            lg: '20px 0 20px 20px',
            md: '15px 0 15px 15px',
            sm: '10px 0 10px 10px',
            xs: '10px 0 10px 10px',
          },
        }}
      >
        <Query
          coloreQuery={coloreQuery}
          codeQuery={codeQuery}
          hadlerOnClearQuery={hadlerOnClearQuery}
          handlerSetDefaultValues={handlerSetDefaultValues}
          handlerOnChangeQuery={handlerOnChangeQuery}
          handlerClickDocs={handlerClickDocs}
          handlerClick={handlerClick}
          setSnackOpen={setSnackOpen}
          isVariablesOpen={isVariablesOpen}
        ></Query>
        <VariablesHeader
          setVariablesOpen={setVariablesOpen}
          isVariablesOpen={isVariablesOpen}
        ></VariablesHeader>
        <Variables
          coloreVars={coloreVars}
          codeVars={codeVars}
          handlerOnChangeVars={handlerOnChangeVars}
          hadlerOnClearVars={hadlerOnClearVars}
          setSnackOpen={setSnackOpen}
          isVariablesOpen={isVariablesOpen}
        ></Variables>
      </Paper>
      <Response
        loading={loading}
        codeResponse={codeResponse}
        setSnackOpen={setSnackOpen}
      ></Response>
    </Box>
  );
}

export default Editor;
