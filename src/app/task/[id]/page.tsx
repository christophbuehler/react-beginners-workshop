import ProtectedLayout from '@/app/protected-layout';
import TaskForm from '@/components/task/task-form';
import {Skeleton} from '@/components/ui/skeleton';
import {Suspense} from 'react';

interface TaskPageProps {
  params: Promise<{
    id: string;
  }>;
}

const Srkeleton = () => (
  <div className="flex flex-col space-y-3">
    <Skeleton className="h-[125px] w-full rounded-xl" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  </div>
);

const TaskPage = async ({params}: TaskPageProps) => {
  const {id: taskId} = await params;
  return (
    <ProtectedLayout>
      <Suspense fallback={<Srkeleton />}>
        <TaskForm taskId={taskId} />
      </Suspense>
    </ProtectedLayout>
  );
};

export default TaskPage;
