import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/providers/theme-provider";
import { FirebaseProvider } from "@/app/providers/firebase-provider";
import { AuthProvider } from "@/app/providers/auth-provider";
import { MyProfileProvider } from "./providers/my-profile-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorProvider } from "./providers/error-provider";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RoboChores",
  description: "Demo Project for a React Beginners Workshop",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ErrorProvider>
            <TooltipProvider>
              <FirebaseProvider>
                <AuthProvider>
                  <MyProfileProvider>
                    <div className="mx-auto container my-4">{children}</div>
                  </MyProfileProvider>
                </AuthProvider>
              </FirebaseProvider>
            </TooltipProvider>
          </ErrorProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
