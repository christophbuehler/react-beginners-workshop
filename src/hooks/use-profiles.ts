'use client';

import type {Profile} from '@/app/providers/my-profile-provider';
import {useSnapshot} from '@/hooks/use-snapshot';

export const useProfiles = (): {
  profiles: Profile[] | null;
  loading: boolean;
} => {
  const {data: profiles, loading} = useSnapshot<Profile[]>('users');
  return {profiles, loading};
};
