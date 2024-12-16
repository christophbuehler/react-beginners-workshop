"use client";

import { TaskList, TaskListCol } from "./task-list";
import { Card } from "../ui/card";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useInbox } from "@/hooks/use-inbox";

const TaskInbox = () => {
  const { tasks } = useInbox();
  const cols = new Set<TaskListCol>(["title", "accept"]);
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-xl font-bold flex items-center gap-2">
        Inbox
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="opacity-60 transition-opacity hover:opacity-100 h-5 w-5" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Tasks sent to you that are awaiting your acceptance.</p>
          </TooltipContent>
        </Tooltip>
      </h1>
      <Card>
        <TaskList emptyMessage="Inbox is empty." cols={cols} tasks={tasks} />
      </Card>
    </div>
  );
};

export default TaskInbox;
