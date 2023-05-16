import { useEffect, useState } from 'react';
import { IntrospectionQuery, Source, buildClientSchema, parse, validate } from 'graphql';

function useValidationQuery(code: string, scheme: object | undefined) {
  const [isValidQuery, setIsValidQuery] = useState<undefined | boolean>(undefined);
  const [errValidQuery, setErrValidQuery] = useState('');

  function validQuery(code: string, scheme: object | undefined) {
    const errorsMessageArr: string[] = [];
    try {
      if (code != '' && scheme != undefined) {
        setIsValidQuery(true);
        const source = new Source(code);
        const errors = validate(buildClientSchema(scheme as IntrospectionQuery), parse(source));
        errors.forEach((err) => {
          setIsValidQuery(false);
          errorsMessageArr.push(err.message);
        });
        if (errors.length > 0) {
          setIsValidQuery(false);
        }
      } else {
        setIsValidQuery(undefined);
        setErrValidQuery('');
      }
    } catch (err) {
      setIsValidQuery(false);
      errorsMessageArr.push((err as Error).message);
    }
    setErrValidQuery(errorsMessageArr.join('\n'));
  }
  useEffect(() => {
    validQuery(code, scheme);
  }, [code, scheme]);
  return { isValidQuery, errValidQuery };
}

export default useValidationQuery;
