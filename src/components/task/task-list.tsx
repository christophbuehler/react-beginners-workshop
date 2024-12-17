'use client';

import type {Task} from '@/hooks/use-tasks';
import {acceptTask} from '@/lib/accept-task';
import {TooltipTrigger} from '@radix-ui/react-tooltip';
import clsx from 'clsx';
import {format} from 'date-fns';
import {Check, X} from 'lucide-react';
import Link from 'next/link';
import ProfileButton from '../profile-button';
import {Button} from '../ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {Tooltip, TooltipContent} from '../ui/tooltip';
import {TaskStatusBadge} from './task-status-badge';

export type TaskListCol =
  | 'title'
  | 'creator'
  | 'owner'
  | 'status'
  | 'actions'
  | 'accept'
  | 'updated';

const gridCols: Record<
  TaskListCol,
  [header: string, content: (task: Task) => React.ReactNode, className?: string]
> = {
  title: ['Title', (task) => task.title, 'w-full'],
  creator: [
    'Creator',
    ({originalOwnerId}) => (
      <ProfileButton variant="link" profileId={originalOwnerId} />
    ),
    'w-min',
  ],
  owner: [
    'Owner',
    ({ownerId}) => <ProfileButton variant="link" profileId={ownerId} />,
  ],
  status: ['Status', (task) => <TaskStatusBadge task={task} />],
  actions: [
    'Actions',
    (task) => (
      <Link href={`/task/${task.id}`}>
        <Button variant="outline" size="sm">
          View
        </Button>
      </Link>
    ),
  ],
  accept: [
    '',
    (task) =>
      !task.accepted && (
        <div className="space-x-2 whitespace-nowrap">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => acceptTask(task, false)}
              >
                <X />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reject this task and send it back to its owner.</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => acceptTask(task, true)}
              >
                <Check />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Accept this task.</p>
            </TooltipContent>
          </Tooltip>
        </div>
      ),
    'w-min',
  ],
  updated: [
    'Updated',
    (task) => (
      <i className="whitespace-nowrap">
        {format(task.updatedAt.toDate(), 'yyyy-MM-dd hh:mm')}
      </i>
    ),
  ],
};

interface TaskListProps {
  tasks: Task[] | null;
  cols: Set<TaskListCol>;
  emptyMessage?: string;
}

export const TaskList = ({
  tasks,
  cols,
  emptyMessage = 'No tasks found. 👀',
}: TaskListProps) => {
  const displayCols = Array.from(cols).map((col) => gridCols[col]);
  return (
    <>
      {tasks && tasks.length > 0 ? (
        <Table className="table-auto w-full">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {displayCols.map(([header, , cls]) => (
                <TableHead key={header} className={cls}>
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task: Task) => (
              <TableRow className="hover:bg-transparent" key={task.id}>
                {displayCols.map(([header, cell, cls]) => (
                  <TableCell key={header} className={clsx(cls, 'align-middle')}>
                    {cell(task)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="w-full text-center text-primary/80 py-2 inline-block">
          {emptyMessage}
        </p>
      )}
    </>
  );
};
