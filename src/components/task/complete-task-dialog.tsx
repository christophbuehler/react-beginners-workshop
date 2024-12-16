import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Task } from "@/hooks/use-tasks";
import { saveTask } from "@/lib/save-task";
import { useState } from "react";
import { useMyProfile } from "@/hooks/use-my-profile";

export interface CompleteTaskDialogProps {
  task: Task;
  open: boolean;
  onClose: () => void;
}

export default function CompleteTaskDialog({
  task,
  open,
  onClose,
}: CompleteTaskDialogProps) {
  const [loading, setLoading] = useState(false);
  const { myProfile } = useMyProfile();

  const complete = async () => {
    setLoading(true);
    await saveTask({ ...task, ownerId: task.originalOwnerId, completed: true });
    setLoading(false);
    onClose();
  };

  const differentOriginalOwnerId =
    myProfile?.id !== task.originalOwnerId ? task.originalOwnerId : null;

  return (
    <Dialog open={open} onOpenChange={(opn) => !opn && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Complete Task</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-primary/80">
          {differentOriginalOwnerId
            ? "This task will be completed and sent back to its owner."
            : "This task will be completed."}
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={complete} disabled={loading}>
            {loading ? "Completing..." : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
