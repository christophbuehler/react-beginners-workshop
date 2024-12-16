import ProtectedLayout from "./protected-layout";
import { MyTaskList } from "../components/my-task-list";
import TaskInbox from "@/components/task-inbox";

export default function Home() {
  return (
    <ProtectedLayout>
      <div className="grid grid-cols-3 gap-16">
        <TaskInbox />
        <div className="col-span-2">
          <MyTaskList />
        </div>
      </div>
    </ProtectedLayout>
  );
}
