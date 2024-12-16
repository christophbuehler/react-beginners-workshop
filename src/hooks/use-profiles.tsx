"use client";

import { Profile } from "@/app/providers/my-profile-provider";
import { useSnapshot } from "@/hooks/use-snapshot";

export const useProfiles = (): {
  profiles: Profile[] | null;
  loading: boolean;
  error: string | null;
} => {
  const { data: profiles, loading, error } = useSnapshot<Profile[]>("users");
  return { profiles, loading, error };
};
