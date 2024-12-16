import type {Task} from '@/hooks/use-tasks';
import {getAuth} from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  updateDoc,
} from 'firebase/firestore';

export const saveTask = async (task: Partial<Task>) => {
  const db = getFirestore();
  const currentUid = getAuth()?.currentUser?.uid;
  const updatedAt = new Date();

  if (task.id) {
    await updateDoc(doc(db, 'tasks', task.id), {
      ...task,
      updatedAt,
    });
  } else {
    if (!currentUid) throw new Error('User not authenticated');
    await addDoc(collection(db, 'tasks'), {
      ...task,
      accepted: true,
      originalOwnerId: currentUid,
      ownerId: currentUid,
      createdAt: updatedAt,
      updatedAt,
    });
  }
};
