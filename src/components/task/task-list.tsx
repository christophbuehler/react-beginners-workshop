"use client";

import { Task } from "@/hooks/use-tasks";
import ProfileButton from "../profile-button";
import { Button } from "../ui/button";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "../ui/table";
import Link from "next/link";
import { Check, CheckCheck, Dot, X } from "lucide-react";
import { acceptTask } from "@/lib/accept-task";
import { Badge } from "../ui/badge";
import { Tooltip, TooltipContent } from "../ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";

export type TaskListCol =
  | "title"
  | "creator"
  | "owner"
  | "status"
  | "actions"
  | "accept";

interface TaskListProps {
  tasks: Task[] | null;
  cols: Set<TaskListCol>;
  emptyMessage?: string;
}

export const TaskList = ({
  tasks,
  cols,
  emptyMessage = "No tasks found.",
}: TaskListProps) => {
  const gridCols: Record<
    TaskListCol,
    [
      header: string,
      content: (task: Task) => React.ReactNode,
      className?: string
    ]
  > = {
    title: ["Title", (task) => task.title, "w-full"],
    creator: [
      "Creator",
      ({ originalOwnerId }) => (
        <ProfileButton
          variant="link"
          profileId={originalOwnerId}
          showPopover={true}
        />
      ),
      "w-min",
    ],
    owner: [
      "Owner",
      ({ ownerId }) => (
        <ProfileButton variant="link" profileId={ownerId} showPopover={true} />
      ),
    ],
    status: [
      "Status",
      ({ completed }) =>
        completed ? (
          <Badge variant="secondary" className="cursor-default gap-1">
            <CheckCheck className="w-4 h-4" />
            Completed
          </Badge>
        ) : (
          <Badge className="cursor-default text-white bg-green-600 gap-1">
            <Dot className="w-4 h-4" />
            Open
          </Badge>
        ),
    ],
    actions: [
      "Actions",
      (task) => (
        <Link href={`/task/${task.id}`}>
          <Button variant="outline" size="sm">
            View
          </Button>
        </Link>
      ),
      "w-",
    ],
    accept: [
      "",
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
      "w-min",
    ],
  };

  const displayCols = Array.from(cols).map((col) => gridCols[col]);

  return (
    <>
      {tasks && tasks.length > 0 ? (
        <Table className="table-auto w-full">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {displayCols.map(([header, , cls], i) => (
                <TableHead key={i} className={cls}>
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {tasks.map((task: Task) => (
              <TableRow className="hover:bg-transparent" key={task.id}>
                {displayCols.map(([, cell, cls], i) => (
                  <TableCell key={i} className={cls}>
                    {cell(task)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-gray-500 py-8">{emptyMessage}</p>
      )}
    </>
  );
};
