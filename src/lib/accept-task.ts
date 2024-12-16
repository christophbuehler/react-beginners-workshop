import type {Task} from '@/hooks/use-tasks';
import {saveTask} from './save-task';

export const acceptTask = (task: Task, accept = true) =>
  saveTask(
    accept
      ? {id: task.id, accepted: true}
      : {id: task.id, accepted: false, ownerId: task.originalOwnerId},
  );
