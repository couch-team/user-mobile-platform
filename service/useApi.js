import { useCallback, useState } from 'react';
import request from './core';

const useApi = (apiFunc, isAuth = true) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  // This is the custom hook you will use to call the api function in our apiservice folder.

  const fetch = useCallback(
    async rest => {
      setLoading(true);
      setError('');
      try {
        const result = await request({ ...apiFunc(), data: rest });
        setData(result?.data);
        setIsSuccess(true);
        setIsFailed(false);
      } catch (err) {
        setData(null);
        setIsFailed(true);
        setIsSuccess(false);
        setError(err?.response?.data || err?.message || 'Unexpected error!');
      } finally {
        setLoading(false);
      }
    },
    [apiFunc],
  );

  return {
    data,
    error,
    loading,
    isSuccess,
    isFailed,
    fetch,
  };
};

export default useApi;
