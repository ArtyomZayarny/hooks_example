import { useEffect, useState } from 'react';

const useFetch = (url, options) => {
  const [status, setStatus] = useState({
    loading: false,
    data: undefined,
    error: undefined,
  });

  const fetchNow = (url, options) => {
    setStatus({ loading: true });
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        setStatus({ ...status, loading: false, data: res.data }).catch(
          (error) => {
            setStatus({ loading: false, error });
          }
        );
      });
  };
  useEffect(() => {
    if (url) {
      fetchNow(url, options);
    }
  }, [url]);

  return { ...status, fetchNow };
};
export default useFetch;
