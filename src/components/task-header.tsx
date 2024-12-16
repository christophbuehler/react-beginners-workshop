"use client";

import { Button } from "@/components/ui/button";
import { Task } from "@/hooks/use-tasks";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface TaskHeaderProps {
  children: React.ReactNode;
  task?: Task | null;
}

export default function TaskHeader({ task, children }: TaskHeaderProps) {
  const title = task?.title ?? "New Task";
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
          <h2 className="text-2xl font-semibold">{title}</h2>
        </div>
        {children}
      </div>
    </>
  );
}
