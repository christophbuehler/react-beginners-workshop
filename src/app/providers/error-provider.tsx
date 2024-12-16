'use client';

import {useToast} from '@/components/ui/use-toast';
import {type ReactNode, createContext} from 'react';

type setErrorType = (title: string, ...errorSegments: unknown[]) => void;

interface ErrorContextType {
  setError: setErrorType;
}

export const ErrorContext = createContext<ErrorContextType | undefined>(
  undefined,
);

export const ErrorProvider = ({children}: {children: ReactNode}) => {
  const {toast} = useToast();

  const setError: setErrorType = (
    title: string,
    ...errorSegments: unknown[]
  ) => {
    console.warn(title, errorSegments);
    toast({
      title,
      description: errorSegments.join(', '),
      variant: 'destructive',
      duration: 5000,
    });
  };

  return (
    <ErrorContext.Provider value={{setError}}>{children}</ErrorContext.Provider>
  );
};
