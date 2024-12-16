'use client';

import Logo from '@/components/logo';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardFooter, CardHeader} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import {X} from 'lucide-react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useState} from 'react';

const RegisterPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const year = new Date().getFullYear();

  async function registerUser() {
    const auth = getAuth();
    try {
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }

      setLoading(true);
      setError(null);
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/profile');
    } catch {
      setError('Failed to create an account.');
    }
    setLoading(false);
  }

  return (
    <form className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader>
          <h1 className="text-xl font-semibold text-center text-primary">
            Create an Account
          </h1>
          <p className="text-sm text-center text-muted-foreground">
            Sign up to get started
          </p>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 flex items-center justify-between rounded-md bg-destructive/10 py-2 px-4 text-destructive">
              <span>{error}</span>
              <X className="cursor-pointer" onClick={() => setError(null)} />
            </div>
          )}
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              autoComplete="email"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
            />
            <Input
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
            />
            <Input
              type="password"
              autoComplete="current-password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(evt) => setConfirmPassword(evt.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-4">
          <Button
            disabled={loading}
            type="button"
            className="w-full"
            onClick={registerUser}
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </Button>
          <div className="text-sm text-center text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:underline">
              Log in here
            </Link>
            <br />
            &copy; {year} <Logo />
          </div>
        </CardFooter>
      </Card>
    </form>
  );
};

export default RegisterPage;
