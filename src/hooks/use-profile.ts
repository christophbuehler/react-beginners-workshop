"use client";

import { Profile } from "@/app/providers/my-profile-provider";
import { useSnapshot } from "@/hooks/use-snapshot";
import { useMyProfile } from "./use-my-profile";
import { useAuth } from "./use-auth";

export const useProfile = (
  profileId?: string | null
): {
  profile: Profile | null;
  loading: boolean;
} => {
  const uid = useAuth()?.user?.uid;
  const { loading: myProfileLoading, myProfile } = useMyProfile();
  const { data: profile, loading: snapshotLoading } = useSnapshot<Profile>(
    "users",
    profileId ?? null
  );
  return profileId === uid
    ? { profile: myProfile, loading: myProfileLoading }
    : { profile, loading: snapshotLoading };
};
