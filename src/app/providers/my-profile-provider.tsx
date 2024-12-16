"use client";

import React, {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useMemo,
} from "react";
import { doc, getFirestore, onSnapshot, Timestamp } from "firebase/firestore";
import { useAuth } from "@/hooks/use-auth";
import LoadingIndicator from "@/components/loading-indicator";
import { debugLog } from "@/lib/log";

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
  const db = useMemo(() => getFirestore(), []);
  const [myProfile, setMyProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!uid) {
      debugLog("Skip loading profile because user is not logged in");
      setLoading(false);
      return;
    }
    setLoading(true);
    debugLog("Load user profile", db, uid);

    const docRef = doc(db, "users", uid);
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        const profile = snapshot.data() as Profile | undefined;
        setMyProfile(profile ? { ...profile, id: snapshot.id } : null);
        setLoading(false);
        debugLog("Loaded user profile");
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

  if (loading) return <LoadingIndicator />;

  return (
    <MyProfileContext.Provider value={{ myProfile, error, loading }}>
      {children}
    </MyProfileContext.Provider>
  );
};
