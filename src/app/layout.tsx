import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import {AuthProvider} from '@/app/providers/auth-provider';
import {Toaster} from '@/components/ui/toaster';
import {TooltipProvider} from '@/components/ui/tooltip';
import {ErrorProvider} from './providers/error-provider';
import {MyProfileProvider} from './providers/my-profile-provider';
import '@/lib/firebase-config';
import clsx from 'clsx';
import {ThemeProvider} from 'next-themes';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'RoboChores',
  description: 'Demo Project for a React Beginners Workshop',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={clsx(geistSans.variable, geistMono.variable, 'antialiased')}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ErrorProvider>
            <TooltipProvider>
              <AuthProvider>
                <MyProfileProvider>
                  <div className="mx-auto container my-4">{children}</div>
                </MyProfileProvider>
              </AuthProvider>
            </TooltipProvider>
          </ErrorProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
