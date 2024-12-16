'use client';

import type {Profile} from '@/app/providers/my-profile-provider';
import {Button} from '@/components/ui/button';
import {fetchSnapshot} from '@/hooks/use-snapshot';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import {use} from 'react';

interface ProfileButtonProps {
  profileId: string;
  link?: string;
  variant?: 'link' | 'secondary';
}

export const ProfileButton = ({
  profileId,
  link,
  variant = 'link',
}: ProfileButtonProps) => {
  const profile = use(fetchSnapshot<Profile>('users', profileId));

  console.log({profile});

  const ButtonContent = (
    <Button
      variant={variant}
      className={clsx(
        'flex items-center gap-2',
        link ? '' : 'cursor-default pointer-events-none',
        variant === 'link' ? 'px-0' : '',
      )}
    >
      <div
        className={clsx(
          'w-7 h-7 flex items-center justify-center',
          variant === 'link' ? 'bg-primary/10 rounded-full p-1' : '',
        )}
      >
        <Image
          src={profile.profilePic}
          alt={profile.name ?? 'Profile'}
          width={22}
          height={22}
          className="rounded-full"
        />
      </div>
      <span className="text-sm font-medium">{profile.name}</span>
    </Button>
  );

  return link ? (
    <Link href={link} className="no-underline">
      {ButtonContent}
    </Link>
  ) : (
    ButtonContent
  );
};

export default ProfileButton;
