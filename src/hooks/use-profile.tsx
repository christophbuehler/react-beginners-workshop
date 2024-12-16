"use client";

import { Profile } from "@/app/providers/my-profile-provider";
import { useSnapshot } from "@/hooks/use-snapshot";
import { useMyProfile } from "./use-my-profile";
import { useAuth } from "@/app/providers/auth-provider";

export const useProfile = (
  profileId?: string | null
): {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
} => {
  const uid = useAuth()?.user?.uid;
  if (profileId === uid) {
    const { loading, error, myProfile } = useMyProfile();
    return { profile: myProfile, loading, error };
  }

  const {
    data: profile,
    loading,
    error,
  } = useSnapshot<Profile>("users", profileId ?? undefined);
  return { profile, loading, error };
};
