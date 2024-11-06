import { useState, useCallback } from 'react';
import { AxiosError } from 'axios';

interface ApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

export function useApi<T>(initialData: T | null = null) {
  const [state, setState] = useState<ApiState<T>>({
    data: initialData,
    isLoading: false,
    error: null
  });

  const execute = useCallback(async (promise: Promise<T>) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const data = await promise;
      setState({ data, isLoading: false, error: null });
      return data;
    } catch (error) {
      const message = error instanceof AxiosError 
        ? error.response?.data?.message || error.message
        : 'Une erreur est survenue';
      setState(prev => ({ ...prev, isLoading: false, error: message }));
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ data: initialData, isLoading: false, error: null });
  }, [initialData]);

  return {
    ...state,
    execute,
    reset
  };
}