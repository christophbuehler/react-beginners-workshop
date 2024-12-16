'use client';

import {debugLog} from '@/lib/log';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from 'firebase/firestore';
import memoize from 'lodash.memoize';
import {useEffect, useState} from 'react';
import {useError} from './use-error';

export const useSnapshot = <T>(
  path: string,
  documentId?: string | null,
  forceFetch = false,
): {data: T | null; loading: boolean} => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const {setError} = useError();

  useEffect(() => {
    if (documentId === null) {
      setLoading(false);
      return;
    }
    const fetchDataWrapper = async () => {
      try {
        const cacheKey = documentId ? `${path}/${documentId}` : path;
        if (!forceFetch && memoizedFetchData.cache.has(cacheKey)) {
          setData((await memoizedFetchData.cache.get(cacheKey)) as T);
          setLoading(false);
          return;
        }
        setLoading(true);

        if (forceFetch) {
          memoizedFetchData.cache.delete(documentId ? cacheKey : path);
        }

        const result = await memoizedFetchData(path, documentId);
        setData(result as T);
      } catch (err) {
        setError(`Error fetching snapshot: ${(err as Error).message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchDataWrapper();
  }, [path, documentId, forceFetch, setError]);

  return {data, loading};
};

export const fetchData = async (path: string, documentId?: string) => {
  const firestore = getFirestore();

  const random = Math.random();

  if (documentId) {
    const docRef = doc(firestore, path, documentId);
    debugLog(`Fetching document '${documentId}' at path '${path}'.`, random);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {id: docSnap.id, ...docSnap.data()};
    }
    throw new Error(`Document at path "${path}/${documentId}" does not exist.`);
  }

  const collectionRef = collection(firestore, path);
  debugLog(`Fetching documents at path '${path}'.`, random);
  const querySnapshot = await getDocs(collectionRef);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const memoizedFetchData = memoize(fetchData, (path, documentId) =>
  documentId ? `${path}/${documentId}` : path,
);
