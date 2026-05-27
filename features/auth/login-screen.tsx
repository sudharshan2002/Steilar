"use client";

import Link from "next/link";
import { Apple, Mail } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signInWithApple, signInWithEmail, signInWithGoogle } from "@/lib/firebase/auth";

export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function emailLogin() {
    try {
      await signInWithEmail(email, password);
      window.location.href = "/home";
    } catch {
      setMessage("Email sign in needs Firebase credentials.");
    }
  }

  return (
    <main className="safe-x safe-top flex min-h-dvh flex-col bg-black pb-8 text-white">
      <header className="flex items-center justify-between">
        <img src="/Logo/logo only.png" alt="Steilar" className="h-8 w-8 object-contain" />
        <Link href="/home" className="text-[12px] font-medium text-white/48">
          Skip
        </Link>
      </header>

      <section className="flex flex-1 flex-col justify-center">
        <h1 className="text-[1.75rem] font-normal leading-tight">Sign in to Steilar</h1>

        <div className="mt-8 space-y-3">
          <Button
            className="h-12 w-full justify-start rounded-[1.1rem] border border-white/10 bg-white/8 px-4 text-white hover:bg-white/12"
            variant="ghost"
            onClick={() => signInWithApple().catch(() => setMessage("Apple sign in needs Firebase setup."))}
          >
            <Apple className="h-4 w-4" />
            Continue with Apple
          </Button>
          <Button
            className="h-12 w-full justify-start rounded-[1.1rem] border border-white/10 bg-white/8 px-4 text-white hover:bg-white/12"
            variant="ghost"
            onClick={() => signInWithGoogle().catch(() => setMessage("Google sign in needs Firebase setup."))}
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black">G</span>
            Continue with Google
          </Button>
        </div>

        <div className="mt-6 space-y-3">
          <Input placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
          <Input placeholder="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          <Button className="h-12 w-full bg-white text-black hover:bg-white/90" onClick={emailLogin}>
            <Mail className="h-4 w-4" />
            Continue with email
          </Button>
        </div>

        {message && <p className="mt-4 text-[12px] text-white/46">{message}</p>}
      </section>
    </main>
  );
}
