import {useError} from '@/hooks/use-error';
import type {Task} from '@/hooks/use-tasks';
import {saveTask} from '@/lib/save-task';
import {useState} from 'react';
import ProfilePicker from '../profile-picker';
import {Button} from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

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
  const {setError} = useError();

  const changeOwner = async () => {
    try {
      if (disabled) return;
      setLoading(true);
      await saveTask({id: task.id, ownerId, accepted: false});
      onChange();
    } catch {
      setError('Could not delegate task');
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(opn) => !opn && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delegate Task</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-sm text-primary/80">
          You are about to change the owner of the task{' '}
          <strong>{task.title}</strong>.
        </DialogDescription>
        <ProfilePicker value={null} onChange={(id) => setOwnerId(id)} />
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={disabled || loading}
            variant="default"
            onClick={changeOwner}
          >
            {loading ? 'Delegating...' : 'Delegate Task'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
