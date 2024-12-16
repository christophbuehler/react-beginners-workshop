'use client';

import type {Profile} from '@/app/providers/my-profile-provider';
import {useSnapshot} from '@/hooks/use-snapshot';
import {useAuth} from './use-auth';
import {useMyProfile} from './use-my-profile';

export const useProfile = (
  profileId?: string | null,
): {
  profile: Profile | null;
  loading: boolean;
} => {
  const uid = useAuth()?.user?.uid;
  const {myProfile} = useMyProfile();
  const {data: profile, loading: snapshotLoading} = useSnapshot<Profile>(
    'users',
    profileId ?? null,
  );
  return profileId === uid
    ? {profile: myProfile, loading: false}
    : {profile, loading: snapshotLoading};
};
