import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type Docs = {
  name: string;
  description: string;
  fields: [
    {
      name: string;
      description: string;
      args: [
        {
          name: string;
          description: string;
          type: {
            name: string | null;
            ofType: { name: string | null };
          };
        }
      ];
      type: {
        kind: string;
        name: string;
      };
    }
  ];
  inputFields: [
    {
      name: string;
      description: string;
      type: { name: string | null };
    }
  ];
};

import {
  Box,
  Chip,
  IconButton,
  LinearProgress,
  Stack,
  SwipeableDrawer,
  Typography,
} from '@mui/material';
import { Close, Brightness1 } from '@mui/icons-material';

import { useTranslation } from 'react-i18next';
import '../../i18nex';
import { getIntrospectionQuery } from 'graphql';

type ComponentProps = {
  loading: boolean;
  queryName: string;
  setQueryName: Dispatch<SetStateAction<string>>;
  isDocsOpen: boolean;
  setDocsOpen: Dispatch<SetStateAction<boolean>>;
};

function Documentation(props: ComponentProps) {
  const { t } = useTranslation();
  const [docs, setDocs] = useState<undefined | Docs>();

  const getDocs = async (path: RequestInfo | URL, name: string) => {
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
        console.log(queryArr);
        setDocs(findNestedObj(queryArr, name));
      } else {
        const errorFetch = new Error(`Network Error: response ${response.status}`);
        throw errorFetch;
      }
    } catch (err: unknown) {
      console.error(err);
    }
  };

  // const findByName = (arr: Array<Docs>, name: string) => {
  //   const obj = arr.find((el) => el.name === name) as Docs;
  //   setDocs(obj);
  // };

  function findNestedObj(arr: Array<Docs>, name: string) {
    let foundObj;
    JSON.stringify(arr, (_, nestedValue) => {
      if (nestedValue && nestedValue['name'] === name) {
        foundObj = nestedValue;
      }
      return nestedValue;
    });
    console.log(foundObj);
    return foundObj;
  }

  useEffect(() => {
    getDocs('https://rickandmortyapi.com/graphql', props.queryName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.queryName]);

  return (
    <SwipeableDrawer
      open={props.isDocsOpen}
      onClose={() => props.setDocsOpen(false)}
      onOpen={() => props.setDocsOpen(true)}
      sx={{ touchAction: 'none' }}
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
              fontSize: { lg: '1.5rem', md: '1.4rem', sm: '1.3rem', xs: '1.2rem' },
            }}
          >
            {t('editor.docsTitle')}
          </Typography>
          <IconButton onClick={() => props.setDocsOpen(false)}>
            <Close />
          </IconButton>
        </Box>
        <Typography variant="body1" component="h5">
          {t('editor.docsValidationTitle')}
        </Typography>
        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: '15px' }}>
          <Chip
            icon={
              <Brightness1
                style={{ color: '#F0FFF0', border: '1px solid gray', borderRadius: '50%' }}
              />
            }
            label={t('editor.docsValidationTrue')}
            variant="outlined"
          />
          <Chip
            icon={
              <Brightness1
                style={{ color: '#FFE4E1', border: '1px solid gray', borderRadius: '50%' }}
              />
            }
            label={t('editor.docsValidationFalse')}
            variant="outlined"
          />
          <Chip
            icon={
              <Brightness1
                style={{ color: '#F5F5F5', border: '1px solid gray', borderRadius: '50%' }}
              />
            }
            label={t('editor.docsValidationEmpty')}
            variant="outlined"
          />
        </Stack>
        <Typography variant="body1" component="h5">
          {t('editor.docsAPITitle')}
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
          <Box
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#f5f5f5',
              border: '1px solid grey',
              borderRadius: '5px',
            }}
          >
            {docs && (
              <>
                <div>{docs.name}</div>
                <div>{docs.description}</div>
                <div>
                  {docs.inputFields && (
                    <Box>
                      {docs.inputFields.map((el, key) => (
                        <Box
                          key={key}
                          onClick={() => {
                            props.setQueryName(el.name);
                            console.log(props.queryName, docs);
                          }}
                        >
                          {el.name}
                        </Box>
                      ))}
                    </Box>
                  )}
                </div>
                <div>
                  {docs.fields && (
                    <Box>
                      {docs.fields.map((el, key) => (
                        <Box
                          key={key}
                          onClick={() => {
                            props.setQueryName(el.name);
                            console.log(props.queryName, docs);
                          }}
                        >
                          {el.name}
                          {`${el.args && el.args[0].name} | ${
                            el.args[0].type.ofType && el.args[0].type.ofType.name
                          }`}
                          {el.type.name}
                        </Box>
                      ))}
                    </Box>
                  )}
                </div>
                <button onClick={() => props.setQueryName('Query')}>XXXX</button>
              </>
            )}
          </Box>
        )}
      </Box>
    </SwipeableDrawer>
  );
}

export default Documentation;
