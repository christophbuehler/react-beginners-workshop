"use client";

import { useAuth } from "@/app/providers/auth-provider";
import React, { useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Logo from "@/components/logo";

export default function Register() {
  const router = useRouter();
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const year = new Date().getFullYear();

  async function registerUser() {
    try {
      setError(null);
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      await register(email, password);
      router.push("/profile");
    } catch {
      setError("Failed to create an account.");
    }
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
          <Button type="button" className="w-full" onClick={registerUser}>
            Sign Up
          </Button>
          <div className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
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
}
