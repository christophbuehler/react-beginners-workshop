import ProtectedLayout from "./protected-layout";
import { MyTaskList } from "../components/task/my-task-list";
import TaskInbox from "@/components/task/task-inbox";

const HomePage = () => (
  <ProtectedLayout>
    <div className="grid grid-cols-3 gap-16">
      <TaskInbox />
      <div className="col-span-2">
        <MyTaskList />
      </div>
    </div>
  </ProtectedLayout>
);

export default HomePage;
