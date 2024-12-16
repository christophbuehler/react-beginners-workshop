'use client';

import {MyTasksContext} from '@/app/providers/my-tasks-provider';
import {useContext} from 'react';

export const useMyTasks = () => {
  const context = useContext(MyTasksContext);
  if (!context)
    throw new Error('useMyTasks must be used within an MyTasksProvider');
  return context;
};
