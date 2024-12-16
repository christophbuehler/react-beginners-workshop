"use client";

import { useSnapshot } from "@/hooks/use-snapshot";

export interface Task {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  originalOwnerId: string;
  completed: boolean;
  accepted: boolean;
}

export const useTasks = (): {
  tasks: Task[];
  loading: boolean;
  error: string | null;
} => {
  const { data: tasks, loading, error } = useSnapshot<Task[]>("tasks");
  return { tasks: tasks || [], loading, error };
};
