import TaskForm from "@/components/task-form";
import ProtectedLayout from "../../protected-layout";

export default function CreateTask() {
  return (
    <ProtectedLayout>
      <TaskForm />
    </ProtectedLayout>
  );
}
