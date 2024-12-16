"use client";

import { Button } from "@/components/ui/button";
import { Task } from "@/hooks/use-tasks";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { TaskStatusBadge } from "./task-status-badge";

interface TaskHeaderProps {
  task?: Task | null;
}

export default function TaskHeader({ task }: TaskHeaderProps) {
  const isNew = !task?.title;
  return (
    <>
      <Link href="/" passHref>
        <Button variant="link" className="px-0">
          <ArrowLeft />
          All Tasks
        </Button>
      </Link>
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-semibold">
            {isNew ? (
              "New Task"
            ) : (
              <>
                {task.title} <TaskStatusBadge task={task} />
              </>
            )}
          </h2>
        </div>
      </div>
    </>
  );
}
