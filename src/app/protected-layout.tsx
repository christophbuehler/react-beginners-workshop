'use client';

import LoadingIndicator from '@/components/loading-indicator';
import Toolbar from '@/components/toolbar';
import {useAuth} from '@/hooks/use-auth';
import {useMyProfile} from '@/hooks/use-my-profile';
import {usePathname, useRouter} from 'next/navigation';
import type React from 'react';
import {useEffect} from 'react';
import {InboxProvider} from './providers/inbox-provider';
import {MyTasksProvider} from './providers/my-tasks-provider';

const ProtectedLayout = ({children}: {children: React.ReactNode}) => {
  const {user} = useAuth();
  const isLoggedIn = !!user;
  const {myProfile} = useMyProfile();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    if (!myProfile && pathname !== '/profile') {
      router.push('/profile');
    }
  }, [isLoggedIn, router, myProfile, pathname]);

  if (!isLoggedIn) return <LoadingIndicator />;

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
