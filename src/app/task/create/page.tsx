import TaskForm from "@/components/task/task-form";
import ProtectedLayout from "../../protected-layout";

const CreateTaskPage = () => (
  <ProtectedLayout>
    <TaskForm />
  </ProtectedLayout>
);

export default CreateTaskPage;
