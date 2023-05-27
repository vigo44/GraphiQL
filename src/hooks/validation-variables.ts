import { useEffect, useState } from 'react';

function useValidationVaribles(variables: string) {
  const [isValidVaribles, setisValidVaribles] = useState<undefined | boolean>(undefined);
  const [errValidVaribles, setErrValidVaribles] = useState('');

  function validVar(variables: string) {
    try {
      if (variables != '') {
        setisValidVaribles(true);
        JSON.parse(variables);
      } else {
        setisValidVaribles(undefined);
      }
    } catch (err) {
      setisValidVaribles(false);
      setErrValidVaribles((err as Error).message);
    }
  }
  useEffect(() => {
    validVar(variables);
  }, [variables]);
  return { isValidVaribles, errValidVaribles };
}

export default useValidationVaribles;
