'use client';

import {useSnapshot} from '@/hooks/use-snapshot';
import type {Task} from './use-tasks';

export const useTask = (
  taskId: string | undefined,
): {
  task: Task | null;
  loading: boolean;
} => {
  const {data: task, loading} = useSnapshot<Task>('tasks', taskId ?? null);
  return {task, loading};
};
