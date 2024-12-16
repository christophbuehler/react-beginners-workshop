'use client';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {useError} from '@/hooks/use-error';
import {fetchSnapshot} from '@/hooks/use-snapshot';
import type {Task} from '@/hooks/use-tasks';
import {saveTask} from '@/lib/save-task';
import {useRouter} from 'next/navigation';
import {use, useReducer, useState} from 'react';
import TaskHeader from './task-header';
import TaskSidebar from './task-sidebar';

interface TaskFormProps {
  taskId?: string;
}

interface FormState {
  title: string;
  content: string;
}

type FormAction =
  | {type: 'SET_TITLE'; payload: string}
  | {type: 'SET_CONTENT'; payload: string};

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SET_TITLE':
      return {...state, title: action.payload};
    case 'SET_CONTENT':
      return {...state, content: action.payload};
    default:
      return state;
  }
};

export default function TaskForm({taskId}: TaskFormProps) {
  const task = use(fetchSnapshot<Task>('tasks', taskId ?? null));
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const {setError} = useError();
  const [formState, dispatch] = useReducer(
    formReducer,
    task ?? {
      title: '',
      content: '',
    },
  );

  const save = async () => {
    setSaving(true);
    try {
      const taskData: Partial<Task> = {
        ...task,
        ...formState,
      };
      await saveTask(taskData);
      router.push('/');
    } catch {
      setError('Could not create task');
      setSaving(false);
    }
  };

  console.log(task?.title, formState.title);

  const canSubmit =
    !saving && formState.title?.trim() && formState.content.trim();

  return (
    <div className="grid grid-cols-3 gap-16">
      <div className="col-span-2">
        <TaskHeader task={task ?? undefined} />
        <div className="space-y-8 mb-8">
          <div className="space-y-2">
            <Label className="font-bold" htmlFor="title">
              Title*
            </Label>
            <Input
              id="title"
              value={formState.title}
              onChange={(e) =>
                dispatch({type: 'SET_TITLE', payload: e.target.value})
              }
              disabled={saving}
            />
          </div>
          <div className="space-y-2">
            <Label className="font-bold" htmlFor="content">
              Content
            </Label>
            <Textarea
              rows={8}
              id="content"
              value={formState.content}
              onChange={(e) =>
                dispatch({type: 'SET_CONTENT', payload: e.target.value})
              }
              disabled={saving}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button variant="outline" onClick={save} disabled={!canSubmit}>
            {saving ? 'Saving...' : taskId ? 'Update Task' : 'Create Task'}
          </Button>
        </div>
      </div>
      <TaskSidebar task={task} />
    </div>
  );
}
