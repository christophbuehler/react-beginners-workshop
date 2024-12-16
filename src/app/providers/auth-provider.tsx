"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useFirebase } from "./firebase-provider";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { useError } from "@/hooks/use-error";
import LoadingIndicator from "@/components/loading-indicator";
import { debugLog } from "@/lib/log";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { auth } = useFirebase()!;
  const { setError } = useError();

  useEffect(() => {
    debugLog("Subscribe to auth state changes");
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("AUTH", currentUser);
      setUser(currentUser ?? null);
      debugLog("Auth state:", currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      setLoading(false);
    } catch (error) {
      console.warn("Login failed:", error);
      throw error;
    }
  };

  const register = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
    } catch (error) {
      console.warn("Registration failed:", error);
      throw error;
    }
    setLoading(false);
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      setError("Logout failed");
      throw error;
    }
    setLoading(false);
  };

  if (loading) return <LoadingIndicator />;

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
