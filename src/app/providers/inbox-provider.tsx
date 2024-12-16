"use client";

import React, { createContext, useState, useEffect } from "react";
import {
  onSnapshot,
  query,
  collection,
  where,
  getFirestore,
} from "firebase/firestore";
import { useMyProfile } from "@/hooks/use-my-profile";
import { Task } from "@/hooks/use-tasks";

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

  const { myProfile } = useMyProfile();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!myProfile?.id) return;

    const tasksQuery = query(
      collection(db, "tasks"),
      where("ownerId", "==", myProfile.id),
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
  }, [myProfile?.id]);

  return (
    <InboxContext.Provider value={{ tasks }}>{children}</InboxContext.Provider>
  );
};
