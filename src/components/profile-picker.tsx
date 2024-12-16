'use client';

import type {Profile} from '@/app/providers/my-profile-provider';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {useProfiles} from '@/hooks/use-profiles';
import {cn} from '@/lib/utils';
import Image from 'next/image';
import {useEffect, useState} from 'react';

interface ProfilePickerProps {
  value?: string | null;
  onChange: (id: string | null) => void;
}

const ProfilePicker = ({value, onChange}: ProfilePickerProps) => {
  const {profiles} = useProfiles();
  const [search, setSearch] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const profile = profiles?.find((p) => p.id === value) || null;
    setSelectedProfile(profile);
  }, [value, profiles]);

  const filteredProfiles = profiles?.filter((profile) =>
    profile.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSelect = (profile: Profile) => {
    setSelectedProfile(profile);
    setSearch('');
    onChange(profile.id);
  };

  const handleDeselect = () => {
    setSelectedProfile(null);
    onChange(null);
  };

  return (
    <div className="relative w-full">
      {!selectedProfile ? (
        <Input
          type="text"
          placeholder="Search and select a profile..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setSearch('')}
          className="rounded-md"
        />
      ) : (
        <div className="flex items-center justify-between p-2 border rounded-md">
          <div className="flex items-center gap-2">
            <Image
              src={selectedProfile.profilePic}
              alt={selectedProfile.name}
              width={30}
              height={30}
              className="rounded-full"
            />
            <span>{selectedProfile.name}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDeselect}
            className="text-destructive"
          >
            ✕
          </Button>
        </div>
      )}

      {search && !selectedProfile && (
        <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg">
          {filteredProfiles && filteredProfiles.length > 0 ? (
            filteredProfiles.map((profile) => (
              <div
                key={profile.id}
                onClick={() => handleSelect(profile)}
                className={cn(
                  'flex items-center gap-3 p-2 cursor-pointer hover:bg-accent',
                )}
              >
                <Image
                  src={profile.profilePic}
                  alt={profile.name}
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <span className="text-sm font-medium">{profile.name}</span>
              </div>
            ))
          ) : (
            <div className="p-2 text-center text-sm text-muted-foreground">
              No profiles found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePicker;
