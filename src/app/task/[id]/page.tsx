import ProtectedLayout from '@/app/protected-layout';
import TaskForm from '@/components/task/task-form';

interface TaskPageProps {
  params: Promise<{
    id: string;
  }>;
}

const TaskPage = async ({params}: TaskPageProps) => {
  const {id: taskId} = await params;
  return (
    <ProtectedLayout>
      <TaskForm taskId={taskId} />
    </ProtectedLayout>
  );
};

export default TaskPage;
