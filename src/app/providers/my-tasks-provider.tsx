"use client";

import React, { createContext, useState, useEffect, useMemo } from "react";
import {
  onSnapshot,
  query,
  collection,
  where,
  getFirestore,
} from "firebase/firestore";
import { Task } from "@/hooks/use-tasks";
import { useAuth } from "@/hooks/use-auth";

interface MyTasksContextProps {
  tasks: Task[];
}

export const MyTasksContext = createContext<MyTasksContextProps | undefined>(
  undefined
);

export interface MyTasksProviderProps {
  children: React.ReactNode;
}

export const MyTasksProvider = ({ children }: MyTasksProviderProps) => {
  const db = useMemo(() => getFirestore(), []);
  const uid = useAuth()?.user?.uid;
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!uid) return;

    const tasksQuery = query(
      collection(db, "tasks"),
      where("ownerId", "==", uid),
      where("accepted", "==", true)
    );

    const unsubscribe = onSnapshot(tasksQuery, (snapshot) => {
      const fetchedTasks: Task[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];
      setTasks(fetchedTasks);
    });

    return () => unsubscribe();
  }, [db, uid]);

  return (
    <MyTasksContext.Provider value={{ tasks }}>
      {children}
    </MyTasksContext.Provider>
  );
};
