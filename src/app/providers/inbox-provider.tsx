'use client';

import {useAuth} from '@/hooks/use-auth';
import type {Task} from '@/hooks/use-tasks';
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import type React from 'react';
import {createContext, useEffect, useState} from 'react';

interface InboxContextProps {
  tasks: Task[];
}

export const InboxContext = createContext<InboxContextProps | undefined>(
  undefined,
);

export interface InboxProviderProps {
  children: React.ReactNode;
}

export const InboxProvider = ({children}: InboxProviderProps) => {
  const uid = useAuth()?.user?.uid;
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const db = getFirestore();
    if (!uid) return;
    const tasksQuery = query(
      collection(db, 'tasks'),
      where('ownerId', '==', uid),
      where('accepted', '==', false),
    );
    const unsubscribe = onSnapshot(tasksQuery, (snapshot) => {
      const fetchedTasks: Task[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];
      setTasks(fetchedTasks);
    });

    return () => unsubscribe();
  }, [uid]);

  return (
    <InboxContext.Provider value={{tasks}}>{children}</InboxContext.Provider>
  );
};
