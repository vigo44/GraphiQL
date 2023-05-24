import { Dispatch, SetStateAction, Suspense, useEffect, useState } from 'react';

import {
  Box,
  Chip,
  CircularProgress,
  IconButton,
  Stack,
  SwipeableDrawer,
  Typography,
} from '@mui/material';
import { Close, Brightness1 } from '@mui/icons-material';

import { useTranslation } from 'react-i18next';
import '../../i18nex';

import { Docs } from '../../pages/editor/editor';

type ComponentProps = {
  docs: Docs[] | undefined
  isDocsOpen: boolean;
  setDocsOpen: Dispatch<SetStateAction<boolean>>;
};

function Documentation(props: ComponentProps) {
  const { t } = useTranslation();
  const [currentDocs, setCurrentDocs] = useState<undefined | Docs>();
  const [breadcrumbs, setBreadcrumbs] = useState<Docs[]>([]);

  const findNestedObj = (name: string) => {
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
    console.log(breadcrumbs);
    setCurrentDocs(foundObj);
  }

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
            width: { lg: '600px', md: '500px', sm: '400px', xs: 'fit-content' },
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
            <Box
              sx={{
                width: '100%',
                height: '100%',
                backgroundColor: '#f5f5f5',
                border: '1px solid grey',
                borderRadius: '5px',
              }}
            >
              {currentDocs && (
                <Box
                  sx={{ width: { lg: '100%', md: '100%', sm: '100%', xs: 'fit-content' }, p: '10px' }}
                >
                  {breadcrumbs.length > 0 && <Typography variant="body1" onClick={() => {
                    setCurrentDocs(breadcrumbs[breadcrumbs.length - 1])
                    setBreadcrumbs(breadcrumbs.slice(0, -1))
                  }}>{breadcrumbs[breadcrumbs.length - 1].name}</Typography>}
                  <Typography variant="h6">{currentDocs.name}</Typography>
                  <Typography variant="body1">{currentDocs.description}</Typography>
                  <Box>
                    {currentDocs.fields && (
                      <Box>
                        <Typography variant="subtitle2">Fields</Typography>
                        {currentDocs.fields.map((el, key) => (
                          <Box key={key} sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', p: '5px 0' }}>
                              <Typography
                                variant="body1"
                                color="blue"
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
                                          onClick={() => {
                                            setBreadcrumbs([...breadcrumbs, currentDocs]);
                                            el.type.name && findNestedObj(el.type.name);
                                          }}
                                        >
                                          {el.type.name}
                                        </Typography>
                                      ) : el.type.ofType.name ? (
                                        <Typography
                                          variant="body1"
                                          color="orange"
                                          onClick={() => {
                                            setBreadcrumbs([...breadcrumbs, currentDocs]);
                                            el.type.ofType.name &&
                                              findNestedObj(el.type.ofType.name);
                                          }}
                                        >
                                          {el.type.ofType.name}
                                        </Typography>
                                      ) : el.type.ofType.ofType.name ? (
                                        <Typography
                                          variant="body1"
                                          color="orange"
                                          onClick={() => {
                                            setBreadcrumbs([...breadcrumbs, currentDocs]);
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
                                          onClick={() => {
                                            setBreadcrumbs([...breadcrumbs, currentDocs]);
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
                                  onClick={() => {
                                    setBreadcrumbs([...breadcrumbs, currentDocs]);
                                    el.type.name && findNestedObj(el.type.name);
                                  }}
                                >
                                  {el.type.name}
                                </Typography>
                              ) : el.type.ofType.name ? (
                                <Typography
                                  variant="body1"
                                  color="orange"
                                  onClick={() => {
                                    setBreadcrumbs([...breadcrumbs, currentDocs]);
                                    el.type.ofType.name && findNestedObj(el.type.ofType.name);
                                  }}
                                >
                                  {el.type.ofType.name}
                                </Typography>
                              ) : (
                                <Typography
                                  variant="body1"
                                  color="orange"
                                  onClick={() => {
                                    setBreadcrumbs([...breadcrumbs, currentDocs]);
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
                        <Typography variant="subtitle2">Fields</Typography>
                        {currentDocs.inputFields.map((el, key) => (
                          <Box key={key} sx={{ display: 'flex' }}>
                            <Typography
                              variant="body1"
                              color="blue"
                              onClick={() => {
                                setBreadcrumbs([...breadcrumbs, currentDocs]);
                                findNestedObj(el.name);
                              }}
                            >
                              {el.name}
                            </Typography>
                            <Typography variant="subtitle2">{':'}</Typography>
                            <Typography
                              variant="body1"
                              color="orange"
                              onClick={() => {
                                setBreadcrumbs([...breadcrumbs, currentDocs]);
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
                      <Typography variant="subtitle2">Type</Typography>
                      <Box sx={{ display: 'flex' }}>
                        <Typography variant="body1">{currentDocs.type.kind === 'LIST' && '['}</Typography>
                        {currentDocs.type.ofType && (
                          <Typography variant="body1">
                            {currentDocs.type.ofType.kind === 'LIST' && '['}
                          </Typography>
                        )}
                        {currentDocs.type.name ? (
                          <Typography
                            variant="body1"
                            color="orange"
                            onClick={() => {
                              setBreadcrumbs([...breadcrumbs, currentDocs]);
                              currentDocs.type.name && findNestedObj(currentDocs.type.name);
                            }}
                          >
                            {currentDocs.type.name}
                          </Typography>
                        ) : currentDocs.type.ofType.name ? (
                          <Typography
                            variant="body1"
                            color="orange"
                            onClick={() => {
                              setBreadcrumbs([...breadcrumbs, currentDocs]);
                              currentDocs.type.ofType.name && findNestedObj(currentDocs.type.ofType.name);
                            }}
                          >
                            {currentDocs.type.ofType.name}
                          </Typography>
                        ) : (
                          <Typography
                            variant="body1"
                            color="orange"
                            onClick={() => {
                              setBreadcrumbs([...breadcrumbs, currentDocs]);
                              currentDocs.type.ofType.ofType.name &&
                                findNestedObj(currentDocs.type.ofType.ofType.name);
                            }}
                          >
                            {currentDocs.type.ofType.ofType.name}
                          </Typography>
                        )}
                        <Typography variant="body1">{currentDocs.type.kind === 'LIST' && ']'}</Typography>
                        {currentDocs.type.ofType && (
                          <Typography variant="body1">
                            {currentDocs.type.ofType.kind === 'LIST' && ']'}
                          </Typography>
                        )}
                        <Typography variant="body1">
                          {currentDocs.type.kind === 'NON_NULL' && '!'}
                        </Typography>
                      </Box>
                      {currentDocs.args.length > 0 && <Typography variant="subtitle2">Arguments</Typography>}
                      {currentDocs.args.map((el, key) => (
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
                                setBreadcrumbs([...breadcrumbs, currentDocs]);
                                el.type.name && findNestedObj(el.type.name);
                              }}
                            >
                              {el.type.name}
                            </Typography>
                          ) : el.type.ofType.name ? (
                            <Typography
                              variant="body1"
                              color="orange"
                              onClick={() => {
                                setBreadcrumbs([...breadcrumbs, currentDocs]);
                                el.type.ofType.name && findNestedObj(el.type.ofType.name);
                              }}
                            >
                              {el.type.ofType.name}
                            </Typography>
                          ) : el.type.ofType.ofType.name ? (
                            <Typography
                              variant="body1"
                              color="orange"
                              onClick={() => {
                                setBreadcrumbs([...breadcrumbs, currentDocs]);
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
                              onClick={() => {
                                setBreadcrumbs([...breadcrumbs, currentDocs]);
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
                  {!currentDocs.args && !currentDocs.fields && !currentDocs.inputFields && currentDocs.type && (
                    <Box>
                      <Typography variant="subtitle2">Type</Typography>
                      {currentDocs.type.name ? (
                        <Typography
                          variant="body1"
                          color="orange"
                          onClick={() => {
                            setBreadcrumbs([...breadcrumbs, currentDocs]);
                            currentDocs.type.name && findNestedObj(currentDocs.type.name);
                          }}
                        >
                          {currentDocs.type.name}
                        </Typography>
                      ) : currentDocs.type.ofType.name ? (
                        <Typography
                          variant="body1"
                          color="orange"
                          onClick={() => {
                            setBreadcrumbs([...breadcrumbs, currentDocs]);
                            currentDocs.type.ofType.name && findNestedObj(currentDocs.type.ofType.name);
                          }}
                        >
                          {currentDocs.type.ofType.name}
                        </Typography>
                      ) : (
                        <Typography
                          variant="body1"
                          color="orange"
                          onClick={() => {
                            setBreadcrumbs([...breadcrumbs, currentDocs]);
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
              )}
            </Box>
          <button onClick={() => {
            setBreadcrumbs(breadcrumbs.splice(0, breadcrumbs.length - 1));
            // props.docs && setBreadcrumbs([...breadcrumbs, props.docs[0]]);
            findNestedObj('Query')}}>XXXX</button>
        </Box>
    </SwipeableDrawer>
  );
}

export default Documentation;
