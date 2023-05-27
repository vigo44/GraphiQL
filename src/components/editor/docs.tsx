import { Suspense, useState } from 'react';

import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { Undo } from '@mui/icons-material';

import { useTranslation } from 'react-i18next';
import '../../i18nex';

import { Docs } from '../../pages/editor/editor';

type ComponentProps = {
  docs: Docs[] | undefined;
};

function APIDocs(props: ComponentProps) {
  const { t } = useTranslation();
  const [currentDocs, setCurrentDocs] = useState<undefined | Docs>();
  const [breadcrumbs, setBreadcrumbs] = useState<Docs[]>([]);

  const findNestedObj = (name: string) => {
    let foundObj;

    currentDocs && setBreadcrumbs([...breadcrumbs, currentDocs]);

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
      JSON.stringify(currentDocs, (_, nestedValue) => {
        if (nestedValue && nestedValue['name'] === name) {
          foundObj = nestedValue;
        }
        return nestedValue;
      });
    } else {
      if (props.docs && props.docs.filter((el) => el.name === name).length) {
        foundObj = props.docs.filter((el) => el.name === name)[0];
      } else {
        JSON.stringify(props.docs, (_, nestedValue) => {
          if (nestedValue && nestedValue['name'] === name) {
            foundObj = nestedValue;
          }
          return nestedValue;
        });
      }
    }
    setCurrentDocs(foundObj);
  };

  return (
    <Suspense fallback={<CircularProgress />}>
      {props.docs ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            width: '100%',
          }}
        >
          <Typography variant="body1" component="h5">
            {t('editor.docsAPITitle')}
          </Typography>
          <Button
            variant="contained"
            size="small"
            sx={{
              width: 'fit-content',
            }}
            onClick={() => {
              setBreadcrumbs([]);
              setCurrentDocs(undefined);
            }}
          >
            Root Types
          </Button>
          <Box
            sx={{
              backgroundColor: '#f5f5f5',
              border: '1px solid grey',
              borderRadius: '5px',
            }}
          >
            {currentDocs ? (
              <Box
                sx={{
                  p: '10px',
                }}
              >
                {breadcrumbs.length > 1 ? (
                  <Button
                    variant="outlined"
                    sx={{ textTransform: 'none', marginBottom: '10px' }}
                    size="small"
                    startIcon={<Undo />}
                    onClick={() => {
                      setCurrentDocs(breadcrumbs[breadcrumbs.length - 1]);
                      setBreadcrumbs(breadcrumbs.slice(0, -1));
                    }}
                  >
                    {breadcrumbs[breadcrumbs.length - 1].name}
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    sx={{ textTransform: 'none', marginBottom: '10px' }}
                    size="small"
                    startIcon={<Undo />}
                    onClick={() => {
                      setBreadcrumbs([]);
                      setCurrentDocs(undefined);
                    }}
                  >
                    Docs
                  </Button>
                )}
                <Typography variant="h6">{currentDocs.name}</Typography>
                <Typography variant="body1">{currentDocs.description}</Typography>
                <Box>
                  {currentDocs.fields && (
                    <Box>
                      <Typography variant="subtitle2">❐ Fields</Typography>
                      {currentDocs.fields.map((el, key) => (
                        <Box
                          key={key}
                          sx={{ display: 'flex', flexDirection: 'column', paddingLeft: '5px' }}
                        >
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', p: '5px 0' }}>
                            <Typography
                              variant="body1"
                              color="blue"
                              sx={{
                                cursor: 'pointer',
                                '&:hover': {
                                  textDecoration: 'underline',
                                },
                              }}
                              onClick={() => {
                                findNestedObj(el.name);
                              }}
                            >
                              {el.name}
                            </Typography>
                            <Typography variant="body1">
                              {currentDocs.name === 'Query' ? '(' : ':'}
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
                                        sx={{
                                          cursor: 'pointer',
                                          '&:hover': {
                                            textDecoration: 'underline',
                                          },
                                        }}
                                        onClick={() => {
                                          el.type.name && findNestedObj(el.type.name);
                                        }}
                                      >
                                        {el.type.name}
                                      </Typography>
                                    ) : el.type.ofType.name ? (
                                      <Typography
                                        variant="body1"
                                        color="orange"
                                        sx={{
                                          cursor: 'pointer',
                                          '&:hover': {
                                            textDecoration: 'underline',
                                          },
                                        }}
                                        onClick={() => {
                                          el.type.ofType.name && findNestedObj(el.type.ofType.name);
                                        }}
                                      >
                                        {el.type.ofType.name}
                                      </Typography>
                                    ) : el.type.ofType.ofType.name ? (
                                      <Typography
                                        variant="body1"
                                        color="orange"
                                        sx={{
                                          cursor: 'pointer',
                                          '&:hover': {
                                            textDecoration: 'underline',
                                          },
                                        }}
                                        onClick={() => {
                                          el.type.ofType.ofType.name &&
                                            findNestedObj(el.type.ofType.ofType.name);
                                        }}
                                      >
                                        {el.type.ofType.ofType.name}
                                      </Typography>
                                    ) : (
                                      <Typography
                                        variant="body1"
                                        color="orange"
                                        sx={{
                                          cursor: 'pointer',
                                          '&:hover': {
                                            textDecoration: 'underline',
                                          },
                                        }}
                                        onClick={() => {
                                          el.type.ofType.ofType.ofType.name &&
                                            findNestedObj(el.type.ofType.ofType.ofType.name);
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
                              {currentDocs.name === 'Query' && '): '}
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
                                sx={{
                                  cursor: 'pointer',
                                  '&:hover': {
                                    textDecoration: 'underline',
                                  },
                                }}
                                onClick={() => {
                                  el.type.name && findNestedObj(el.type.name);
                                }}
                              >
                                {el.type.name}
                              </Typography>
                            ) : el.type.ofType.name ? (
                              <Typography
                                variant="body1"
                                color="orange"
                                sx={{
                                  cursor: 'pointer',
                                  '&:hover': {
                                    textDecoration: 'underline',
                                  },
                                }}
                                onClick={() => {
                                  el.type.ofType.name && findNestedObj(el.type.ofType.name);
                                }}
                              >
                                {el.type.ofType.name}
                              </Typography>
                            ) : (
                              <Typography
                                variant="body1"
                                color="orange"
                                sx={{
                                  cursor: 'pointer',
                                  '&:hover': {
                                    textDecoration: 'underline',
                                  },
                                }}
                                onClick={() => {
                                  el.type.ofType.ofType.name &&
                                    findNestedObj(el.type.ofType.ofType.name);
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
                  {currentDocs.inputFields && (
                    <Box>
                      <Typography variant="subtitle2">❐ Fields</Typography>
                      {currentDocs.inputFields.map((el, key) => (
                        <Box key={key} sx={{ display: 'flex', p: '5px 0 5px 5px' }}>
                          <Typography
                            variant="body1"
                            color="blue"
                            sx={{
                              cursor: 'pointer',
                              '&:hover': {
                                textDecoration: 'underline',
                              },
                            }}
                            onClick={() => {
                              findNestedObj(el.name);
                            }}
                          >
                            {el.name}
                          </Typography>
                          <Typography variant="body1">{':'}</Typography>
                          <Typography
                            variant="body1"
                            color="orange"
                            sx={{
                              cursor: 'pointer',
                              '&:hover': {
                                textDecoration: 'underline',
                              },
                            }}
                            onClick={() => {
                              el.type.name && findNestedObj(el.type.name);
                            }}
                          >
                            {el.type.name}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
                {currentDocs.args && (
                  <Box>
                    <Typography variant="subtitle2">◈ Type</Typography>
                    <Box sx={{ display: 'flex', paddingLeft: '5px' }}>
                      <Typography variant="body1">
                        {currentDocs.type.kind === 'LIST' && '['}
                      </Typography>
                      {currentDocs.type.ofType && (
                        <Typography variant="body1">
                          {currentDocs.type.ofType.kind === 'LIST' && '['}
                        </Typography>
                      )}
                      {currentDocs.type.name ? (
                        <Typography
                          variant="body1"
                          color="orange"
                          sx={{
                            cursor: 'pointer',
                            '&:hover': {
                              textDecoration: 'underline',
                            },
                          }}
                          onClick={() => {
                            currentDocs.type.name && findNestedObj(currentDocs.type.name);
                          }}
                        >
                          {currentDocs.type.name}
                        </Typography>
                      ) : currentDocs.type.ofType.name ? (
                        <Typography
                          variant="body1"
                          color="orange"
                          sx={{
                            cursor: 'pointer',
                            '&:hover': {
                              textDecoration: 'underline',
                            },
                          }}
                          onClick={() => {
                            currentDocs.type.ofType.name &&
                              findNestedObj(currentDocs.type.ofType.name);
                          }}
                        >
                          {currentDocs.type.ofType.name}
                        </Typography>
                      ) : (
                        <Typography
                          variant="body1"
                          color="orange"
                          sx={{
                            cursor: 'pointer',
                            '&:hover': {
                              textDecoration: 'underline',
                            },
                          }}
                          onClick={() => {
                            currentDocs.type.ofType.ofType.name &&
                              findNestedObj(currentDocs.type.ofType.ofType.name);
                          }}
                        >
                          {currentDocs.type.ofType.ofType.name}
                        </Typography>
                      )}
                      <Typography variant="body1">
                        {currentDocs.type.kind === 'LIST' && ']'}
                      </Typography>
                      {currentDocs.type.ofType && (
                        <Typography variant="body1">
                          {currentDocs.type.ofType.kind === 'LIST' && ']'}
                        </Typography>
                      )}
                      <Typography variant="body1">
                        {currentDocs.type.kind === 'NON_NULL' && '!'}
                      </Typography>
                    </Box>
                    {currentDocs.args.length > 0 && (
                      <Typography variant="subtitle2">❖ Arguments</Typography>
                    )}
                    {currentDocs.args.map((el, key) => (
                      <Box
                        key={key}
                        sx={{
                          display: 'flex',
                          paddingLeft: '5px',
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
                            sx={{
                              cursor: 'pointer',
                              '&:hover': {
                                textDecoration: 'underline',
                              },
                            }}
                            onClick={() => {
                              el.type.name && findNestedObj(el.type.name);
                            }}
                          >
                            {el.type.name}
                          </Typography>
                        ) : el.type.ofType.name ? (
                          <Typography
                            variant="body1"
                            color="orange"
                            sx={{
                              cursor: 'pointer',
                              '&:hover': {
                                textDecoration: 'underline',
                              },
                            }}
                            onClick={() => {
                              el.type.ofType.name && findNestedObj(el.type.ofType.name);
                            }}
                          >
                            {el.type.ofType.name}
                          </Typography>
                        ) : el.type.ofType.ofType.name ? (
                          <Typography
                            variant="body1"
                            color="orange"
                            sx={{
                              cursor: 'pointer',
                              '&:hover': {
                                textDecoration: 'underline',
                              },
                            }}
                            onClick={() => {
                              el.type.ofType.ofType.name &&
                                findNestedObj(el.type.ofType.ofType.name);
                            }}
                          >
                            {el.type.ofType.ofType.name}
                          </Typography>
                        ) : (
                          <Typography
                            variant="body1"
                            color="orange"
                            sx={{
                              cursor: 'pointer',
                              '&:hover': {
                                textDecoration: 'underline',
                              },
                            }}
                            onClick={() => {
                              el.type.ofType.ofType.ofType.name &&
                                findNestedObj(el.type.ofType.ofType.ofType.name);
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
                {!currentDocs.args &&
                  !currentDocs.fields &&
                  !currentDocs.inputFields &&
                  currentDocs.type && (
                    <Box>
                      <Typography variant="subtitle2">◈ Type</Typography>
                      {currentDocs.type.name ? (
                        <Typography
                          variant="body1"
                          color="orange"
                          sx={{
                            cursor: 'pointer',
                            '&:hover': {
                              textDecoration: 'underline',
                            },
                          }}
                          onClick={() => {
                            currentDocs.type.name && findNestedObj(currentDocs.type.name);
                          }}
                        >
                          {currentDocs.type.name}
                        </Typography>
                      ) : currentDocs.type.ofType.name ? (
                        <Typography
                          variant="body1"
                          color="orange"
                          sx={{
                            cursor: 'pointer',
                            '&:hover': {
                              textDecoration: 'underline',
                            },
                          }}
                          onClick={() => {
                            currentDocs.type.ofType.name &&
                              findNestedObj(currentDocs.type.ofType.name);
                          }}
                        >
                          {currentDocs.type.ofType.name}
                        </Typography>
                      ) : (
                        <Typography
                          variant="body1"
                          color="orange"
                          sx={{
                            cursor: 'pointer',
                            '&:hover': {
                              textDecoration: 'underline',
                            },
                          }}
                          onClick={() => {
                            currentDocs.type.ofType.ofType.name &&
                              findNestedObj(currentDocs.type.ofType.ofType.name);
                          }}
                        >
                          {currentDocs.type.ofType.ofType.name}
                        </Typography>
                      )}
                    </Box>
                  )}
              </Box>
            ) : (
              <Box
                sx={{
                  width: { lg: '100%', md: '100%', sm: '100%', xs: 'fit-content' },
                  p: '10px',
                }}
              >
                <Typography variant="h5">Docs</Typography>
                <Typography variant="body1">
                  A GraphQL schema provides a root type for each kind of operation.
                </Typography>
                <Typography variant="subtitle2">⌘ Root Types</Typography>
                <Box sx={{ display: 'flex', paddingLeft: '5px' }}>
                  <Typography variant="body1" color="blue">
                    query:
                  </Typography>
                  <Typography
                    variant="body1"
                    color="orange"
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                    onClick={() => {
                      findNestedObj('Query');
                      props.docs && setBreadcrumbs([...breadcrumbs, props.docs[0]]);
                    }}
                  >
                    Query
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            p: '20px',
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Suspense>
  );
}

export default APIDocs;
