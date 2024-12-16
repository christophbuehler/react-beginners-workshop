'use client';

import LoadingIndicator from '@/components/loading-indicator';
import {debugLog} from '@/lib/log';
import {type User, getAuth, onAuthStateChanged} from 'firebase/auth';
import {type ReactNode, createContext, useEffect, useState} from 'react';

interface AuthContextType {
  user: User | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const auth = getAuth();
    debugLog('Subscribe to auth state changes');
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser ?? null);
      debugLog('Auth state:', currentUser);
    });
    return () => unsubscribe();
  }, []);

  if (user === undefined) return <LoadingIndicator />;

  return <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>;
};
