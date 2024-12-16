'use client';

import {Button} from '@/components/ui/button';
import {useProfile} from '@/hooks/use-profile';
import Image from 'next/image';
import Link from 'next/link';

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
  const {profile} = useProfile(profileId);

  if (!profile) return null;

  console.log({profile});

  const ButtonContent = (
    <Button
      variant={variant}
      className={`flex items-center gap-2 ${
        link ? '' : 'cursor-default pointer-events-none'
      } ${variant === 'link' ? 'px-0' : ''}`}
    >
      <div
        className={`w-7 h-7 flex items-center justify-center ${
          variant === 'link' ? 'bg-primary/10 rounded-full p-1' : ''
        }`}
      >
        <Image
          src={profile.profilePic}
          alt={profile.name}
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
