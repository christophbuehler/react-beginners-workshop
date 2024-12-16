'use client';

import {type Auth, getAuth} from 'firebase/auth';
import {type Firestore, getFirestore} from 'firebase/firestore';
import {type ReactNode, createContext, useContext} from 'react';
import firebaseApp from '../../lib/firebase-config';

const FirebaseContext = createContext<{
  firestore: Firestore;
  auth: Auth;
} | null>(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({children}: {children: ReactNode}) => {
  const firestore = getFirestore(firebaseApp);
  const auth = getAuth();

  return (
    <FirebaseContext.Provider value={{firestore, auth}}>
      {children}
    </FirebaseContext.Provider>
  );
};
