// import memoize from 'lodash.memoize';
// import {fetchData} from './use-snapshot';
// import {
//   BehaviorSubject,
//   distinctUntilChanged,
//   filter,
//   firstValueFrom,
//   map,
//   Subject,
// } from 'rxjs';
// import { getFirestore } from 'firebase/firestore';

// export const memoizedFetchData = memoize(fetchData, (path, documentId) =>
//   documentId ? `${path}/${documentId}` : path,
// );

// // export const useFirestore = async <T>(
// //   collection: string,
// //   documentId?: string,
// //   realtime = false,
// //   useCache = true,
// // ) => {
// //   throw new Promise();
// // };

// // const a = new Subject();

// // export interface State {
// //   myProfile?: Profile;
// // }

// type State = Record<string, unknown>;

// const globalState = new BehaviorSubject<State>({});

// const realtimeMemo = useMemo()

// export const memoizedFetchData = memoize(fetchData, (path, documentId) =>
//   documentId ? `${path}/${documentId}` : path,
// );

// export const useFirestore = <T>(
//   path: string,
//   {isLocal = false, subscribe = false, forceFetch = false},
// ) => {
//   const state = isLocal ? new Subject<State>() : globalState;
//   const slice = state.pipe(
//     map((s) => s[path] as T | null | undefined),
//     filter((value) => value !== undefined),
//     distinctUntilChanged(),
//   );
//   throw firstValueFrom(slice);

//   // const [data, setData] = useState<T | undefined>();

//   // const uid = useAuth()?.user?.uid;
//   //
//   // const docRef = doc(db, path);

//   // throw new Promise((resolve) => {});
// };

// export const fetchRealtime = (state: Subject<State>, path: string) => {
//   const db = getFirestore();
//   const unsubscribe = onSnapshot(
//     docRef,
//     (snapshot) => {
//       const profile = snapshot.data() as Profile | undefined;
//       setMyProfile(profile ? {...profile, id: snapshot.id} : null);
//       debugLog('Loaded user profile');
//     },
//     (err) => {
//       setError(err.message || 'An error occurred while fetching the profile.');
//     },
//   );
// }
