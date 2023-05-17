import { ChangeEvent, useEffect, useState } from 'react';

import useLoadScheme from '../../hooks/load-scheme';
import useQueryGraphQL from '../../hooks/query-graphql';
import useValidationVaribles from '../../hooks/validation-variables';
import useValidationQuery from '../../hooks/validation-query';

import Documentation from '../../components/editor/documentation';
import VariablesHeader from '../../components/editor/variables-header';
import Variables from '../../components/editor/variables';
import Query from '../../components/editor/query';
import Response from '../../components/editor/response';

import { Box } from '@mui/material';

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
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: { lg: '50%', md: '50%', sm: '100%', xs: '100%' },
          height: '100%',
          p: { lg: '10px', md: '10px', sm: '10px 0', xs: '10px 0' },
        }}
      >
        <Query
          coloreQuery={coloreQuery}
          codeQuery={codeQuery}
          handlerOnChangeQuery={handlerOnChangeQuery}
          handlerClickDocs={handlerClickDocs}
          handlerClick={handlerClick}
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
          isVariablesOpen={isVariablesOpen}
        ></Variables>
      </Box>
      <Response codeResponse={codeResponse}></Response>
    </Box>
  );
}

export default Editor;
