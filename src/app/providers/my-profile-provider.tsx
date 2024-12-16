"use client";

import React, { createContext, ReactNode, useState, useEffect } from "react";
import { doc, getFirestore, onSnapshot, Timestamp } from "firebase/firestore";
import { useAuth } from "@/hooks/use-auth";

export interface Profile {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Timestamp;
  profilePic: string;
}

interface MyProfileContextType {
  myProfile: Profile | null;
  loading: boolean;
  error: string | null;
}

export const MyProfileContext = createContext<MyProfileContextType | undefined>(
  undefined
);

export const MyProfileProvider = ({ children }: { children: ReactNode }) => {
  const uid = useAuth()?.user?.uid;
  const db = getFirestore();
  const [myProfile, setMyProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!uid) return;
    setLoading(true);
    const docRef = doc(db, "users", uid);
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        const profile = snapshot.data() as Profile | undefined;
        setMyProfile(profile ? { ...profile, id: snapshot.id } : null);
        setLoading(false);
      },
      (err) => {
        setError(
          err.message || "An error occurred while fetching the profile."
        );
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [db, uid]);

  return (
    <MyProfileContext.Provider value={{ myProfile, error, loading }}>
      {children}
    </MyProfileContext.Provider>
  );
};
