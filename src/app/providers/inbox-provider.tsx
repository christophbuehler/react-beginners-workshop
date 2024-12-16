"use client";

import React, { createContext, useState, useEffect } from "react";
import {
  onSnapshot,
  query,
  collection,
  where,
  getFirestore,
} from "firebase/firestore";
import { Task } from "@/hooks/use-tasks";
import { useAuth } from "@/hooks/use-auth";

interface InboxContextProps {
  tasks: Task[];
}

export const InboxContext = createContext<InboxContextProps | undefined>(
  undefined
);

export interface InboxProviderProps {
  children: React.ReactNode;
}

export const InboxProvider = ({ children }: InboxProviderProps) => {
  const db = getFirestore();
  const uid = useAuth()?.user?.uid;
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!uid) return;

    const tasksQuery = query(
      collection(db, "tasks"),
      where("ownerId", "==", uid),
      where("accepted", "==", false)
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
    <InboxContext.Provider value={{ tasks }}>{children}</InboxContext.Provider>
  );
};
