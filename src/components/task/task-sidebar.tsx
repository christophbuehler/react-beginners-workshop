"use client";

import { Label } from "@/components/ui/label";
import OwnerChangeDialog from "./owner-change-dialog";
import { Task } from "@/hooks/use-tasks";
import { useState } from "react";
import ProfileButton from "../profile-button";
import { Button } from "../ui/button";
import { CheckCheck, Send } from "lucide-react";
import { saveTask } from "@/lib/save-task";
import { useRouter } from "next/navigation";
import CompleteTaskDialog from "./complete-task-dialog";

export interface TaskSidebarProps {
  task: Task | null;
}

const TaskSidebar = ({ task }: TaskSidebarProps) => {
  const [showOwnerChangeDialog, setShowOwnerChangeDialog] = useState(false);
  const [showCompleteDialog, setShowCompleteDialog] = useState(false);

  const isOriginalOwner = task?.ownerId === task?.originalOwnerId;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const sendToCreator = async () => {
    setLoading(true);
    await saveTask({
      id: task?.id,
      ownerId: task?.originalOwnerId,
      accepted: false,
    });
    router.push("/");
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-8">
      <p className="text-primary/80 text-sm flex flex-col gap-2">
        <strong className="font-bold">About Task Ownership</strong>
        Tasks are owned by the creator by default. You can assign tasks to other
        users, but they can only return the task to the owner. This ensures
        clear ownership and accountability throughout the task&apos;s lifecycle.
      </p>

      {task && (
        <>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between">
              <Label className="text-primary/80">Task Creator</Label>
              <div onClick={() => setShowOwnerChangeDialog(true)}>
                <ProfileButton
                  profileId={task.originalOwnerId}
                  showPopover={true}
                  variant="link"
                />
              </div>
            </div>
            <div className="flex flex-row items-center justify-between">
              <Label>Assigned to:</Label>
              <div>
                <ProfileButton
                  profileId={task.ownerId}
                  showPopover={true}
                  variant="link"
                />
              </div>
            </div>

            {isOriginalOwner ? (
              <Button
                disabled={loading}
                variant="secondary"
                onClick={() => setShowOwnerChangeDialog(true)}
              >
                <Send />
                Delegate Task
              </Button>
            ) : (
              <Button
                disabled={loading}
                variant="secondary"
                onClick={sendToCreator}
              >
                <Send />
                Send Task back to Creator
              </Button>
            )}
          </div>

          <OwnerChangeDialog
            open={showOwnerChangeDialog}
            task={task}
            onClose={() => setShowOwnerChangeDialog(false)}
            onChange={() => router.push("/")}
          />

          <hr />

          {!task.completed && (
            <>
              <div className="flex flex-col gap-4">
                <Button
                  disabled={loading}
                  variant="secondary"
                  onClick={() => setShowCompleteDialog(true)}
                >
                  <CheckCheck />
                  Complete Task
                </Button>

                <p className="text-primary/80 text-sm flex flex-col gap-2">
                  Completing this task will return it to the creator. You can’t
                  undo this action.
                </p>
              </div>
            </>
          )}

          <CompleteTaskDialog
            open={showCompleteDialog}
            onClose={() => setShowCompleteDialog(false)}
            onComplete={() => router.push("/")}
            task={task}
          />
        </>
      )}
    </div>
  );
};

export default TaskSidebar;
