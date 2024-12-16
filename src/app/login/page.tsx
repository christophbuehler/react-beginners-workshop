'use client';

import Logo from '@/components/logo';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardFooter, CardHeader} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {X} from 'lucide-react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useState} from 'react';

const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const year = new Date().getFullYear();

  async function loginUser() {
    const auth = getAuth();
    try {
      setLoading(true);
      setError(null);
      await signInWithEmailAndPassword(auth, username, password);
      router.push('/');
    } catch {
      setError('Invalid username or password.');
    }
    setLoading(false);
  }

  console.log({error});

  return (
    <form className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader>
          <h1 className="text-xl font-semibold text-center text-primary">
            Welcome Back
          </h1>
          <p className="text-sm text-center text-muted-foreground">
            Please log in to your account
          </p>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 flex items-center justify-between rounded-md bg-destructive/10 p-2 text-destructive">
              <span>{error}</span>
              <X className="cursor-pointer" onClick={() => setError(null)} />
            </div>
          )}
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              autoComplete="email"
              value={username}
              onChange={(evt) => setUsername(evt.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-4">
          <Button
            disabled={loading}
            type="button"
            className="w-full"
            onClick={loginUser}
          >
            {loading ? 'Loading...' : 'Sign In'}
          </Button>
          <div className="text-sm text-center text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-primary hover:underline">
              Sign up here
            </Link>
            <br />
            &copy; {year} <Logo />
          </div>
        </CardFooter>
      </Card>
    </form>
  );
};

export default LoginPage;
