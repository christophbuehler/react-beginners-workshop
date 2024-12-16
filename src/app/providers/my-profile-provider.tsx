'use client';

import LoadingIndicator from '@/components/loading-indicator';
import {useAuth} from '@/hooks/use-auth';
import {useError} from '@/hooks/use-error';
import {debugLog} from '@/lib/log';
import {
  type Timestamp,
  doc,
  getFirestore,
  onSnapshot,
} from 'firebase/firestore';
import {type ReactNode, createContext, useEffect, useState} from 'react';

export interface Profile {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Timestamp;
  profilePic: string;
}

interface MyProfileContextType {
  myProfile: Profile | null;
}

export const MyProfileContext = createContext<MyProfileContextType | undefined>(
  undefined,
);

export const MyProfileProvider = ({children}: {children: ReactNode}) => {
  const uid = useAuth()?.user?.uid;
  const [myProfile, setMyProfile] = useState<Profile | null | undefined>(
    undefined,
  );
  const {setError} = useError();

  useEffect(() => {
    const db = getFirestore();
    if (!uid) {
      debugLog('Skip loading profile because user is not logged in');
      setMyProfile(null);
      return;
    }
    debugLog('Load user profile', uid);
    const docRef = doc(db, 'users', uid);
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        const profile = snapshot.data() as Profile | undefined;
        setMyProfile(profile ? {...profile, id: snapshot.id} : null);
        debugLog('Loaded user profile', profile);
      },
      (err) => {
        setError(
          err.message || 'An error occurred while fetching the profile.',
        );
      },
    );
    return () => unsubscribe();
  }, [uid, setError]);

  if (myProfile === undefined) return <LoadingIndicator />;

  return (
    <MyProfileContext.Provider value={{myProfile}}>
      {children}
    </MyProfileContext.Provider>
  );
};
