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
      name === 'episodes' ||
      name === 'species' ||
      name === 'status' ||
      name === 'gender' ||
      name === 'origin' ||
      name === 'created'
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
          width: { lg: '600px', md: '500px', sm: '100wh', xs: '100wh' },
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
            sx={{
              width: '100%',
              height: '100%',
              backgroundColor: '#f5f5f5',
              border: '1px solid grey',
              borderRadius: '5px',
            }}
          >
            {docs && (
              <Box sx={{ p: '10px' }}>
                <Typography variant="h6">{docs.name}</Typography>
                <Typography variant="body1">{docs.description}</Typography>
                <Box>
                  {docs.fields && (
                    <Box>
                      <Typography variant="subtitle2">Fields</Typography>
                      {docs.fields.map((el, key) => (
                        <Box key={key} sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', p: '5px 0' }}>
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
                                    {el.type.ofType && (
                                      <Typography variant="body1">
                                        {el.type.ofType.kind === 'LIST' && '['}
                                      </Typography>
                                    )}
                                    {el.type.name ? (
                                      <Typography
                                        variant="body1"
                                        color="orange"
                                        onClick={() => {
                                          el.type.name && props.setQueryName(el.type.name);
                                        }}
                                      >
                                        {el.type.name}
                                      </Typography>
                                    ) : el.type.ofType.name ? (
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
                                    ) : el.type.ofType.ofType.name ? (
                                      <Typography
                                        variant="body1"
                                        color="orange"
                                        onClick={() => {
                                          el.type.ofType.ofType.name &&
                                            props.setQueryName(el.type.ofType.ofType.name);
                                        }}
                                      >
                                        {el.type.ofType.ofType.name}
                                      </Typography>
                                    ) : (
                                      <Typography
                                        variant="body1"
                                        color="orange"
                                        onClick={() => {
                                          console.log(el);
                                          el.type.ofType.ofType.ofType.name &&
                                            props.setQueryName(el.type.ofType.ofType.ofType.name);
                                        }}
                                      >
                                        {el.type.ofType.ofType.ofType.name}
                                      </Typography>
                                    )}
                                    {el.type.ofType && el.type.ofType.ofType && (
                                      <Typography variant="body1">
                                        {el.type.ofType.ofType.kind === 'NON_NULL' && '!'}
                                      </Typography>
                                    )}
                                    {el.type.ofType && (
                                      <Typography variant="body1">
                                        {el.type.ofType.kind === 'LIST' && ']'}
                                      </Typography>
                                    )}
                                    <Typography variant="body1">
                                      {el.type.kind === 'NON_NULL' && '!'}
                                    </Typography>
                                  </Box>
                                ))}
                              </Box>
                            )}
                            <Typography variant="body1">
                              {docs.name === 'Query' && '): '}
                            </Typography>
                            <Typography variant="body1">
                              {el.type.kind === 'LIST' && '['}
                            </Typography>
                            {el.type.ofType && (
                              <Typography variant="body1">
                                {el.type.ofType.kind === 'LIST' && '['}
                              </Typography>
                            )}
                            {el.type.name ? (
                              <Typography
                                variant="body1"
                                color="orange"
                                onClick={() => {
                                  el.type.name && props.setQueryName(el.type.name);
                                }}
                              >
                                {el.type.name}
                              </Typography>
                            ) : el.type.ofType.name ? (
                              <Typography
                                variant="body1"
                                color="orange"
                                onClick={() => {
                                  el.type.ofType.name && props.setQueryName(el.type.ofType.name);
                                }}
                              >
                                {el.type.ofType.name}
                              </Typography>
                            ) : (
                              <Typography
                                variant="body1"
                                color="orange"
                                onClick={() => {
                                  el.type.ofType.ofType.name &&
                                    props.setQueryName(el.type.ofType.ofType.name);
                                }}
                              >
                                {el.type.ofType.ofType.name}
                              </Typography>
                            )}
                            <Typography variant="body1">
                              {el.type.kind === 'LIST' && ']'}
                            </Typography>
                            {el.type.ofType && (
                              <Typography variant="body1">
                                {el.type.ofType.kind === 'LIST' && ']'}
                              </Typography>
                            )}
                            <Typography variant="body1">
                              {el.type.kind === 'NON_NULL' && '!'}
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
                      <Typography variant="subtitle2">Fields</Typography>
                      {docs.inputFields.map((el, key) => (
                        <Box key={key} sx={{ display: 'flex' }}>
                          <Typography
                            variant="body1"
                            color="blue"
                            onClick={() => {
                              props.setQueryName(el.name);
                            }}
                          >
                            {el.name}
                          </Typography>
                          <Typography variant="subtitle2">{':'}</Typography>
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
                    <Typography variant="subtitle2">Type</Typography>
                    <Box sx={{ display: 'flex' }}>
                      <Typography variant="body1">{docs.type.kind === 'LIST' && '['}</Typography>
                      {docs.type.ofType && (
                        <Typography variant="body1">
                          {docs.type.ofType.kind === 'LIST' && '['}
                        </Typography>
                      )}
                      {docs.type.name ? (
                        <Typography
                          variant="body1"
                          color="orange"
                          onClick={() => {
                            docs.type.name && props.setQueryName(docs.type.name);
                          }}
                        >
                          {docs.type.name}
                        </Typography>
                      ) : docs.type.ofType.name ? (
                        <Typography
                          variant="body1"
                          color="orange"
                          onClick={() => {
                            docs.type.ofType.name && props.setQueryName(docs.type.ofType.name);
                          }}
                        >
                          {docs.type.ofType.name}
                        </Typography>
                      ) : (
                        <Typography
                          variant="body1"
                          color="orange"
                          onClick={() => {
                            docs.type.ofType.ofType.name &&
                              props.setQueryName(docs.type.ofType.ofType.name);
                          }}
                        >
                          {docs.type.ofType.ofType.name}
                        </Typography>
                      )}
                      <Typography variant="body1">{docs.type.kind === 'LIST' && ']'}</Typography>
                      {docs.type.ofType && (
                        <Typography variant="body1">
                          {docs.type.ofType.kind === 'LIST' && ']'}
                        </Typography>
                      )}
                      <Typography variant="body1">
                        {docs.type.kind === 'NON_NULL' && '!'}
                      </Typography>
                    </Box>
                    {docs.args.length > 0 && <Typography variant="subtitle2">Arguments</Typography>}
                    {docs.args.map((el, key) => (
                      <Box
                        key={key}
                        sx={{
                          display: 'flex',
                        }}
                      >
                        <Typography variant="body1" color="indianred">
                          {el.name}
                        </Typography>
                        <Typography variant="body1">{':'}</Typography>
                        <Typography variant="body1">{el.type.kind === 'LIST' && '['}</Typography>
                        {el.type.ofType && (
                          <Typography variant="body1">
                            {el.type.ofType.kind === 'LIST' && '['}
                          </Typography>
                        )}
                        {el.type.name ? (
                          <Typography
                            variant="body1"
                            color="orange"
                            onClick={() => {
                              el.type.name && props.setQueryName(el.type.name);
                            }}
                          >
                            {el.type.name}
                          </Typography>
                        ) : el.type.ofType.name ? (
                          <Typography
                            variant="body1"
                            color="orange"
                            onClick={() => {
                              el.type.ofType.name && props.setQueryName(el.type.ofType.name);
                            }}
                          >
                            {el.type.ofType.name}
                          </Typography>
                        ) : el.type.ofType.ofType.name ? (
                          <Typography
                            variant="body1"
                            color="orange"
                            onClick={() => {
                              el.type.ofType.ofType.name &&
                                props.setQueryName(el.type.ofType.ofType.name);
                            }}
                          >
                            {el.type.ofType.ofType.name}
                          </Typography>
                        ) : (
                          <Typography
                            variant="body1"
                            color="orange"
                            onClick={() => {
                              el.type.ofType.ofType.ofType.name &&
                                props.setQueryName(el.type.ofType.ofType.ofType.name);
                            }}
                          >
                            {el.type.ofType.ofType.ofType.name}
                          </Typography>
                        )}
                        {el.type.ofType && el.type.ofType.ofType && (
                          <Typography variant="body1">
                            {el.type.ofType.ofType.kind === 'NON_NULL' && '!'}
                          </Typography>
                        )}
                        {el.type.ofType && (
                          <Typography variant="body1">
                            {el.type.ofType.kind === 'LIST' && ']'}
                          </Typography>
                        )}
                        <Typography variant="body1">
                          {el.type.kind === 'NON_NULL' && '!'}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}
                {!docs.args && !docs.fields && !docs.inputFields && docs.type && (
                  <Box>
                    <Typography variant="subtitle2">Type</Typography>
                    {docs.type.name ? (
                      <Typography
                        variant="body1"
                        color="orange"
                        onClick={() => {
                          docs.type.name && props.setQueryName(docs.type.name);
                        }}
                      >
                        {docs.type.name}
                      </Typography>
                    ) : docs.type.ofType.name ? (
                      <Typography
                        variant="body1"
                        color="orange"
                        onClick={() => {
                          docs.type.ofType.name && props.setQueryName(docs.type.ofType.name);
                        }}
                      >
                        {docs.type.ofType.name}
                      </Typography>
                    ) : (
                      <Typography
                        variant="body1"
                        color="orange"
                        onClick={() => {
                          docs.type.ofType.ofType.name &&
                            props.setQueryName(docs.type.ofType.ofType.name);
                        }}
                      >
                        {docs.type.ofType.ofType.name}
                      </Typography>
                    )}
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
