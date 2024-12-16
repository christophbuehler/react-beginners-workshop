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

interface MyTasksContextProps {
  tasks: Task[];
}

export const MyTasksContext = createContext<MyTasksContextProps | undefined>(
  undefined,
);

export interface MyTasksProviderProps {
  children: React.ReactNode;
}

export const MyTasksProvider = ({children}: MyTasksProviderProps) => {
  const uid = useAuth()?.user?.uid;
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const db = getFirestore();
    if (!uid) return;
    const tasksQuery = query(
      collection(db, 'tasks'),
      where('ownerId', '==', uid),
      where('accepted', '==', true),
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
    <MyTasksContext.Provider value={{tasks}}>
      {children}
    </MyTasksContext.Provider>
  );
};
