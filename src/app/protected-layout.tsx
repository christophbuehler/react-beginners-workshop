"use client";

import Toolbar from "@/components/toolbar";
import { useMyProfile } from "@/hooks/use-my-profile";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { InboxProvider } from "./providers/inbox-provider";
import { MyTasksProvider } from "./providers/my-tasks-provider";
import LoadingIndicator from "@/components/loading-indicator";
import { useAuth } from "@/hooks/use-auth";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, loading: authLoading } = useAuth();
  const isLoggedIn = !!user;
  const { myProfile, loading: profileLoading } = useMyProfile();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (profileLoading) return;

    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    if (!myProfile && pathname !== "/profile") {
      router.push("/profile");
    }
  }, [isLoggedIn, router, profileLoading, myProfile, pathname]);

  if (authLoading || !isLoggedIn || profileLoading) {
    return <LoadingIndicator />;
  }

  return (
    <InboxProvider>
      <MyTasksProvider>
        <div className="mt-8 space-y-20">
          <div className="px-12">
            <Toolbar />
          </div>
          <main>{children}</main>
        </div>
      </MyTasksProvider>
    </InboxProvider>
  );
};

export default ProtectedLayout;
