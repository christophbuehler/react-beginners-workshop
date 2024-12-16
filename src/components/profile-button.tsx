'use client';

import {Button} from '@/components/ui/button';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {useProfile} from '@/hooks/use-profile';
import Image from 'next/image';
import Link from 'next/link';

interface ProfileButtonProps {
  profileId: string;
  showPopover?: boolean;
  link?: string;
  variant?: 'link' | 'secondary';
}

export const ProfileButton = ({
  profileId,
  showPopover = false,
  link,
  variant = 'link',
}: ProfileButtonProps) => {
  const {profile} = useProfile(profileId);

  if (!profile) return null;

  const formattedDate = new Date(profile.createdAt).toLocaleDateString();

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

  return (
    <div className="relative">
      {showPopover ? (
        <Popover>
          <PopoverTrigger asChild>
            {link ? (
              <Link href={link} className="no-underline">
                {ButtonContent}
              </Link>
            ) : (
              ButtonContent
            )}
          </PopoverTrigger>
          <PopoverContent className="w-64 p-4 flex gap-3">
            <Image
              src={profile.profilePic}
              alt={profile.name}
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <p className="text-sm font-semibold">{profile.name}</p>
              <p className="text-xs text-muted-foreground">
                Created at: {formattedDate}
              </p>
            </div>
          </PopoverContent>
        </Popover>
      ) : link ? (
        <Link href={link} className="no-underline">
          {ButtonContent}
        </Link>
      ) : (
        ButtonContent
      )}
    </div>
  );
};

export default ProfileButton;
