'use client';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {useError} from '@/hooks/use-error';
import {useMyProfile} from '@/hooks/use-my-profile';
import clsx from 'clsx';
import {getAuth, signOut} from 'firebase/auth';
import {doc, getFirestore, setDoc} from 'firebase/firestore';
import {LogOut} from 'lucide-react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {useState} from 'react';

const PROFILE_PIC_OPTIONS = Array.from(
  {length: 9},
  (_, index) => `/botts/bott-${index + 1}.svg`,
);

export const ProfileForm = () => {
  const auth = getAuth();
  const {myProfile} = useMyProfile();
  const router = useRouter();
  const db = getFirestore();
  const [username, setUsername] = useState<string>(myProfile?.name ?? '');
  const [selectedPic, setSelectedPic] = useState<string>(
    myProfile?.profilePic || PROFILE_PIC_OPTIONS[0],
  );
  const isNewUser = !myProfile;
  const [saving, setSaving] = useState<boolean>(false);
  const {setError} = useError();

  const handleSave = async () => {
    const userId = getAuth().currentUser?.uid;
    if (!userId) return;
    setSaving(true);
    try {
      const userDocRef = doc(db, 'users', userId);
      await setDoc(userDocRef, {
        name: username,
        profilePic: selectedPic,
        updatedAt: new Date(),
      });
      router.push('/');
    } catch (err) {
      setError(`Error saving profile: ${(err as Error).message}`);
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="max-w-lg mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">
          {isNewUser ? 'Welcome! Create Your Profile' : 'Edit Your Profile'}
        </h1>
        <p className="text-muted-foreground mt-2">
          Set your username and choose a profile picture.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="username">Username*</Label>
        <Input
          id="username"
          placeholder="Enter your username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Pick your Robo Persona</Label>
        <div className="grid grid-cols-3 gap-4">
          {PROFILE_PIC_OPTIONS.map((pic) => (
            <div
              key={pic}
              onClick={() => setSelectedPic(pic)}
              className={clsx(
                'select-none relative cursor-pointer rounded-lg flex items-center justify-center transition-all',
                selectedPic === pic
                  ? 'ring-2 ring-primary'
                  : 'ring-1 ring-border hover:ring-primary/60',
              )}
            >
              <Image
                src={pic}
                alt="Profile Picture"
                width={80}
                height={80}
                className={clsx(
                  'rounded-lg',
                  selectedPic === pic ? 'animate-grow-shake' : '',
                )}
              />
            </div>
          ))}
        </div>
      </div>

      <Button
        className="w-full"
        onClick={handleSave}
        disabled={!username.trim() || saving}
      >
        {saving ? 'Saving...' : 'Save Profile'}
      </Button>

      <Button
        variant="outline"
        className="w-full"
        disabled={!username.trim() || saving}
        onClick={handleSignOut}
      >
        <LogOut />
        Sign Out
      </Button>
    </div>
  );
};
