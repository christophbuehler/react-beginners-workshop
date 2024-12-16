"use client";

import React, { createContext, ReactNode, useContext } from "react";
import firebaseApp from "../../lib/firebase-config";
import { Firestore, getFirestore } from "firebase/firestore";
import { Auth, getAuth } from "firebase/auth";

const FirebaseContext = createContext<{
  firestore: Firestore;
  auth: Auth;
} | null>(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const firestore = getFirestore(firebaseApp);
  const auth = getAuth();

  return (
    <FirebaseContext.Provider value={{ firestore, auth }}>
      {children}
    </FirebaseContext.Provider>
  );
};
