import {
  getFirestore,
  doc,
  updateDoc,
  addDoc,
  collection,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Task } from "@/hooks/use-tasks";

export const saveTask = async (task: Partial<Task>) => {
  const db = getFirestore();
  const currentUid = getAuth()?.currentUser?.uid;

  if (task.id) {
    await updateDoc(doc(db, "tasks", task.id), {
      ...task,
      updatedAt: new Date(),
    });
  } else {
    if (!currentUid) throw new Error("User not authenticated");
    await addDoc(collection(db, "tasks"), {
      ...task,
      accepted: true,
      originalOwnerId: currentUid,
      ownerId: currentUid,
      createdAt: new Date(),
    });
  }
};
