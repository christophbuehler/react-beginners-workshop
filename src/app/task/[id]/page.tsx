import ProtectedLayout from "@/app/protected-layout";
import TaskForm from "@/components/task-form";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async ({ params }: PageProps) => {
  const { id: taskId } = await params;
  return (
    <ProtectedLayout>
      <TaskForm taskId={taskId} />
    </ProtectedLayout>
  );
};
