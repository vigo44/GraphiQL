import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type Docs = {
  name: string;
  description: string;
  fields: Fields[];
  inputFields: InputFields[];
  args: Args[];
  type: {
    name: string | null;
    kind: string;
    ofType: { name: string | null };
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
  };
};

type Args = {
  name: string;
  description: string;
  type: {
    name: string | null;
    kind: string;
    ofType: { name: string | null };
  };
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
        setDocs(findNestedObj(queryArr, name));
      } else {
        const errorFetch = new Error(`Network Error: response ${response.status}`);
        throw errorFetch;
      }
    } catch (err: unknown) {
      console.error(err);
    }
  };

  function findNestedObj(arr: Array<Docs>, name: string) {
    let foundObj;
    if (
      name === 'id' ||
      name === 'type' ||
      name === 'name' ||
      name === 'location' ||
      name === 'locations' ||
      name === 'character' ||
      name === 'characters' ||
      name === 'episode' ||
      name === 'episodes'
    ) {
      JSON.stringify(docs, (_, nestedValue) => {
        if (nestedValue && nestedValue['name'] === name) {
          foundObj = nestedValue;
        }
        return nestedValue;
      });
    } else {
      if (arr.filter((el) => el.name === name).length) {
        foundObj = arr.filter((el) => el.name === name)[0];
      } else {
        JSON.stringify(arr, (_, nestedValue) => {
          if (nestedValue && nestedValue['name'] === name) {
            foundObj = nestedValue;
          }
          return nestedValue;
        });
      }
    }

    console.log(arr, foundObj);
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
              <Box>
                <Typography variant="h6">{docs.name}</Typography>
                <Typography variant="body1">{docs.description}</Typography>
                <Box>
                  {docs.fields && (
                    <Box>
                      {docs.fields.map((el, key) => (
                        <Box key={key} sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Box sx={{ display: 'flex', p: '5px 0' }}>
                            <Typography
                              variant="body1"
                              color="blue"
                              onClick={() => {
                                props.setQueryName(el.name);
                              }}
                            >
                              {el.name}
                            </Typography>
                            <Typography variant="body1">
                              {docs.name === 'Query' ? '(' : ':'}
                            </Typography>
                            {el.args && (
                              <Box
                                sx={{
                                  display: 'flex',
                                  gap: '5px',
                                }}
                              >
                                {el.args.map((el, key) => (
                                  <Box
                                    key={key}
                                    sx={{
                                      display: 'flex',
                                    }}
                                  >
                                    <Typography variant="body1" color="indianred">
                                      {el.name}:
                                    </Typography>
                                    {el.type.kind !== 'NON_NULL' ? (
                                      <Typography
                                        variant="body1"
                                        color="orange"
                                        onClick={() => {
                                          el.type.name && props.setQueryName(el.type.name);
                                        }}
                                      >
                                        {el.type.name}
                                      </Typography>
                                    ) : (
                                      <Typography
                                        variant="body1"
                                        color="orange"
                                        onClick={() => {
                                          el.type.ofType.name &&
                                            props.setQueryName(el.type.ofType.name);
                                        }}
                                      >
                                        {el.type.ofType.name}
                                      </Typography>
                                    )}
                                  </Box>
                                ))}
                              </Box>
                            )}
                            <Typography variant="body1">
                              {docs.name === 'Query' && '): '}
                            </Typography>
                            <Typography
                              variant="body1"
                              color="orange"
                              onClick={() => {
                                el.type.name && props.setQueryName(el.type.name);
                              }}
                            >
                              {el.type.name}
                            </Typography>
                          </Box>
                          <Typography variant="body1">{el.description}</Typography>
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
                <Box>
                  {docs.inputFields && (
                    <Box>
                      {docs.inputFields.map((el, key) => (
                        <Box key={key}>
                          <Typography
                            variant="body1"
                            onClick={() => {
                              props.setQueryName(el.name);
                            }}
                          >
                            {el.name}
                          </Typography>
                          <Typography
                            variant="body1"
                            color="orange"
                            onClick={() => {
                              el.type.name && props.setQueryName(el.type.name);
                            }}
                          >
                            {el.type.name}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
                {docs.args && (
                  <Box>
                    <Typography
                      variant="body1"
                      color="orange"
                      onClick={() => {
                        docs.type.name && props.setQueryName(docs.type.name);
                      }}
                    >
                      {docs.type.name}
                    </Typography>
                    {docs.args.map((el, key) => (
                      <Box key={key}>
                        <Typography variant="body1">{el.name}</Typography>
                        {el.type.kind !== 'NON_NULL' ? (
                          <Typography
                            variant="body1"
                            color="orange"
                            onClick={() => {
                              el.type.name && props.setQueryName(el.type.name);
                            }}
                          >
                            {el.type.name}
                          </Typography>
                        ) : (
                          <Typography
                            variant="body1"
                            color="orange"
                            onClick={() => {
                              el.type.ofType.name && props.setQueryName(el.type.ofType.name);
                            }}
                          >
                            {el.type.ofType.name}
                          </Typography>
                        )}
                      </Box>
                    ))}
                  </Box>
                )}
                {!docs.args && !docs.fields && !docs.inputFields && docs.type && (
                  <Box>
                    <Typography
                      variant="body1"
                      color="orange"
                      onClick={() => {
                        docs.type.name && props.setQueryName(docs.type.name);
                      }}
                    >
                      {docs.type.name}
                    </Typography>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        )}
        <button onClick={() => props.setQueryName('Query')}>XXXX</button>
      </Box>
    </SwipeableDrawer>
  );
}

export default Documentation;
