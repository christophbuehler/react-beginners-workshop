"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useTask } from "@/hooks/use-task";
import { useRouter } from "next/navigation";
import { useEffect, useReducer, useState } from "react";
import { saveTask } from "@/lib/save-task";
import TaskHeader from "./task-header";
import TaskSidebar from "./task-sidebar";
import { Task } from "@/hooks/use-tasks";
import LoadingIndicator from "../loading-indicator";
import { useError } from "@/hooks/use-error";

interface TaskFormProps {
  taskId?: string;
}

interface FormState {
  title: string;
  content: string;
}

type FormAction =
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_CONTENT"; payload: string };

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_CONTENT":
      return { ...state, content: action.payload };
    default:
      return state;
  }
};

export default function TaskForm({ taskId }: TaskFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setError } = useError();
  const { task, loading: taskLoading } = useTask(taskId);

  const [formState, dispatch] = useReducer(formReducer, {
    title: "",
    content: "",
  });

  useEffect(() => {
    if (task) {
      dispatch({ type: "SET_TITLE", payload: task.title });
      dispatch({ type: "SET_CONTENT", payload: task.content });
    }
  }, [task]);

  const save = async () => {
    setLoading(true);
    try {
      const taskData: Partial<Task> = {
        ...task,
        ...formState,
      };
      await saveTask(taskData);
      router.push("/");
    } catch {
      setError("Could not create task");
      setLoading(false);
    }
  };

  if (taskLoading) return <LoadingIndicator />;

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
                dispatch({ type: "SET_TITLE", payload: e.target.value })
              }
              disabled={loading}
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
                dispatch({ type: "SET_CONTENT", payload: e.target.value })
              }
              disabled={loading}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={save}
            disabled={
              loading || !formState.title.trim() || !formState.content.trim()
            }
          >
            {loading ? "Saving..." : taskId ? "Update Task" : "Create Task"}
          </Button>
        </div>
      </div>
      <TaskSidebar task={task} />
    </div>
  );
}
