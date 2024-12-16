"use client";

import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import memoize from "lodash.memoize";
import { useEffect, useState } from "react";

export const useSnapshot = <T,>(
  path: string,
  documentId?: string,
  forceFetch: boolean = false
): { data: T | null; loading: boolean; error: string | null } => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDataWrapper = async () => {
      setLoading(true);

      try {
        if (forceFetch) {
          memoizedFetchData.cache.delete(
            documentId ? `${path}/${documentId}` : path
          );
        }

        const result = await memoizedFetchData(path, documentId);
        setData(result as T);
      } catch (err) {
        console.error("Error fetching snapshot:", err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchDataWrapper();
  }, [path, documentId, forceFetch]);

  return { data, loading, error };
};

export const fetchData = async (path: string, documentId?: string) => {
  const firestore = getFirestore();

  if (documentId) {
    const docRef = doc(firestore, path, documentId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } else {
    const collectionRef = collection(firestore, path);
    const querySnapshot = await getDocs(collectionRef);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }
};

export const memoizedFetchData = memoize(fetchData, (path, documentId) =>
  documentId ? `${path}/${documentId}` : path
);
