import { Button } from "../ui/button";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTitle,
} from "../ui/dialog";
import { Task } from "@/hooks/use-tasks";
import ProfilePicker from "../profile-picker";
import { useState } from "react";
import { saveTask } from "@/lib/save-task";
import { useError } from "@/hooks/use-error";

export interface OwnerChangeDialogProps {
  open: boolean;
  task: Task;
  onClose: () => void;
  onChange: () => void;
}

export default function OwnerChangeDialog({
  open,
  task,
  onClose,
  onChange,
}: OwnerChangeDialogProps) {
  const [ownerId, setOwnerId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const disabled = !ownerId || ownerId === task.ownerId;
  const { setError } = useError();

  const changeOwner = async () => {
    try {
      if (disabled) return;
      setLoading(true);
      await saveTask({ id: task.id, ownerId, accepted: false });
      onChange();
    } catch {
      setError("Could not delegate task");
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(opn) => !opn && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delegate Task</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-primary/80">
          You are about to change the owner of the task{" "}
          <strong>{task.title}</strong>.
        </p>

        <ProfilePicker value={task.ownerId} onChange={(id) => setOwnerId(id)} />

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={disabled || loading}
            variant="destructive"
            onClick={changeOwner}
          >
            {loading ? "Delegating..." : "Delegate Task"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
