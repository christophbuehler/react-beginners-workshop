'use client';

import {useSnapshot} from '@/hooks/use-snapshot';
import type {Timestamp} from 'firebase/firestore';

export interface Task {
  id: string;
  title: string;
  content: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  ownerId: string;
  originalOwnerId: string;
  completed: boolean;
  accepted: boolean;
}

export const useTasks = (): {
  tasks: Task[];
  loading: boolean;
} => {
  const {data: tasks, loading} = useSnapshot<Task[]>('tasks');
  const safeTasks = Array.isArray(tasks) ? tasks : [];
  return {tasks: safeTasks, loading};
};
