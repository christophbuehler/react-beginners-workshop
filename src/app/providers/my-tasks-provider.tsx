'use client';

import {useAuth} from '@/hooks/use-auth';
import {useError} from '@/hooks/use-error';
import type {Task} from '@/hooks/use-tasks';
import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
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
  const {setError} = useError();

  useEffect(() => {
    const db = getFirestore();
    if (!uid) return;
    const tasksQuery = query(
      collection(db, 'tasks'),
      where('ownerId', '==', uid),
      where('accepted', '==', true),
      orderBy('updatedAt', 'desc'),
    );
    const unsubscribe = onSnapshot(
      tasksQuery,
      (snapshot) => {
        const fetchedTasks: Task[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Task[];
        setTasks(fetchedTasks);
      },
      (err) => {
        setError('Error fetching tasks', err.message);
      },
    );

    return () => unsubscribe();
  }, [uid, setError]);

  return (
    <MyTasksContext.Provider value={{tasks}}>
      {children}
    </MyTasksContext.Provider>
  );
};
