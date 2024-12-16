"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  onSnapshot,
  query,
  collection,
  where,
  getFirestore,
} from "firebase/firestore";
import { useMyProfile } from "@/hooks/use-my-profile";
import { Task } from "@/hooks/use-tasks";

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
  const db = getFirestore();

  const { myProfile } = useMyProfile();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!myProfile?.id) return;

    const tasksQuery = query(
      collection(db, "tasks"),
      where("ownerId", "==", myProfile.id),
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
  }, [myProfile?.id]);

  return (
    <MyTasksContext.Provider value={{ tasks }}>
      {children}
    </MyTasksContext.Provider>
  );
};
