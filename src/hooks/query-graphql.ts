import { useEffect, useState } from 'react';

function useQueryGraphQL(
  link: string,
  query: string,
  variables: string,
  validation: undefined | boolean
) {
  const [response, setResponse] = useState<undefined | string>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  async function fetchGql(
    path: RequestInfo | URL,
    query: string,
    variables: string,
    validation: undefined | boolean
  ) {
    try {
      setError('');
      setLoading(true);
      if (query != '' && path != '' && validation === true) {
        const responseFetch = await fetch(path, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: query,
            variables: JSON.parse(variables),
          }),
        });
        if (responseFetch.ok) {
          const jsonData = await responseFetch.json();
          setResponse(JSON.stringify(jsonData, null, 2));
        } else {
          if (responseFetch.status === 400) {
            const jsonData = await responseFetch.json();
            setResponse(JSON.stringify(jsonData, null, 2));
          } else {
            const errorFetch = new Error(`Network Error: response ${responseFetch.status}`);
            throw errorFetch;
          }
        }
      }
      setLoading(false);
    } catch (err: unknown) {
      setLoading(false);
      setError((err as Error).message);
    }
  }

  useEffect(() => {
    fetchGql(link, query, variables, validation);
  }, [link, query, variables, validation]);
  return { response, loading, error };
}

export default useQueryGraphQL;
