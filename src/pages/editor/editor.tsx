import CodeEditor from '@uiw/react-textarea-code-editor';
import { ChangeEvent, useEffect, useState } from 'react';

import useLoadScheme from '../../hooks/load-scheme';
import useQueryGraphQL from '../../hooks/query-graphql';
import useValidationVaribles from '../../hooks/validation-variables';
import useValidationQuery from '../../hooks/validation-query';

import { useTranslation } from 'react-i18next';
import '../../i18nex';

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
    <>
      <p>{t('editor.queryTitle')}:</p>
      <CodeEditor
        value={codeQuery}
        language="graphql"
        placeholder=""
        onChange={handlerOnChangeQuery}
        padding={15}
        style={{
          fontSize: 12,
          backgroundColor: `${coloreQuery}`,
          fontFamily:
            'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        }}
      />
      <p>{t('editor.varsTitle')}:</p>
      <CodeEditor
        value={codeVars}
        language="json"
        placeholder=""
        onChange={handlerOnChangeVars}
        padding={15}
        style={{
          fontSize: 12,
          backgroundColor: `${coloreVars}`,
          fontFamily:
            'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        }}
      />
      <button onClick={handlerClick}>{t('editor.btnShowRespones')}</button>
      <p>{t('editor.responesTitle')}:</p>
      <CodeEditor
        readOnly={true}
        value={codeResponse}
        language="json"
        placeholder=""
        padding={15}
        style={{
          fontSize: 12,
          backgroundColor: '#f5f5f5',
          fontFamily:
            'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        }}
      />
      <button onClick={handlerClickDocs}>{t('editor.btnShowDocs')}</button>
      <p>{t('editor.docsTitle')}:</p>
      <CodeEditor
        readOnly={true}
        value={codeDocs}
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
    </>
  );
}

export default Editor;
