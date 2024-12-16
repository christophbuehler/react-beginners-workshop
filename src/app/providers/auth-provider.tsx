"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged, User, getAuth } from "firebase/auth";
import LoadingIndicator from "@/components/loading-indicator";
import { debugLog } from "@/lib/log";

interface AuthContextType {
  user: User | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const auth = getAuth();
    debugLog("Subscribe to auth state changes");
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser ?? null);
      debugLog("Auth state:", currentUser);
    });
    return () => unsubscribe();
  }, []);

  if (user === undefined) return <LoadingIndicator />;

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
