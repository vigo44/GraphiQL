import { useEffect, useState } from 'react';
import { IntrospectionQuery, buildClientSchema, getIntrospectionQuery, printSchema } from 'graphql';

function useLoadScheme(link: string) {
  const [scheme, setScheme] = useState();
  const [schemeDocs, setSchemeDocs] = useState<undefined | string>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  async function fetchScheme(path: RequestInfo | URL) {
    try {
      setError('');
      setLoading(true);
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
        setScheme(jsonData.data);
        setSchemeDocs(printSchema(buildClientSchema(jsonData.data as IntrospectionQuery)));
      } else {
        const errorFetch = new Error(`Network Error: response ${response.status}`);
        throw errorFetch;
      }
      setLoading(false);
    } catch (err: unknown) {
      setLoading(false);
      setError((err as Error).message);
    }
  }

  useEffect(() => {
    fetchScheme(link);
  }, [link]);
  return { scheme, schemeDocs, loading, error };
}

export default useLoadScheme;
