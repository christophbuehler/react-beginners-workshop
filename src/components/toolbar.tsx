"use client";

import { ModeToggle } from "@/components/mode-toggle";
import ProfileButton from "./profile-button";
import { useMyProfile } from "@/hooks/use-my-profile";
import Logo from "./logo";

export const Toolbar = () => {
  const { myProfile } = useMyProfile();
  const profileId = myProfile?.id;
  return (
    <header className="flex items-center justify-between px-6 py-4">
      <Logo />
      <div className="flex gap-6">
        {profileId && <ProfileButton link="/profile" profileId={profileId} />}
        <ModeToggle />
      </div>
    </header>
  );
};

export default Toolbar;
