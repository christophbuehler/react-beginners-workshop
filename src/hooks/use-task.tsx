"use client";

import { useSnapshot } from "@/hooks/use-snapshot";
import { Task } from "./use-tasks";

export const useTask = (
  taskId: string | undefined
): {
  task: Task | null;
  loading: boolean;
  error: string | null;
} => {
  if (!taskId) {
    return { task: null, loading: false, error: null };
  }

  const { data: task, loading, error } = useSnapshot<Task>("tasks", taskId);
  return { task, loading, error };
};
