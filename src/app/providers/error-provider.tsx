'use client';

import {useToast} from '@/components/ui/use-toast';
import {type ReactNode, createContext, useState} from 'react';

interface ErrorContextType {
  setError: (error: string) => void;
  error: string | null;
  clearError: () => void;
}

export const ErrorContext = createContext<ErrorContextType | undefined>(
  undefined,
);

export const ErrorProvider = ({children}: {children: ReactNode}) => {
  const {toast} = useToast();
  const [error, setErrorState] = useState<string | null>(null);

  const setError = (error: string) => {
    setErrorState(error);
    toast({
      title: 'Error',
      description: error,
      variant: 'destructive',
      duration: 5000,
    });
  };

  const clearError = () => setErrorState(null);

  return (
    <ErrorContext.Provider value={{error, setError, clearError}}>
      {children}
    </ErrorContext.Provider>
  );
};
