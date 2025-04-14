import React from 'react'
import Link from 'next/link'
import { HorseIcon } from '@/components/logo'
import { LockKeyholeIcon, MailIcon } from 'lucide-react'
import { Input } from '@/components/input'

export default function LoginPage() {
  return (
    <div className="fixed inset-0 h-dvh w-dvw flex justify-center bg-zinc-950">
      <form className="group relative z-10 flex-1 mt-44 px-4 flex flex-col items-center gap-6 sm:max-h-min sm:max-w-[500px] sm:py-4 sm:border sm:border-zinc-600 sm:rounded-lg sm:bg-white/5">
        <HorseIcon className="max-sm:hidden -z-10 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 blur-md w-10/12 h-auto fill-zinc-700" />

        <h1 className="text-xl font-semibold">
          Welcome to Xtreme Go Horse Games!
        </h1>

        <p className="text-sm">
          Enter your email below to login to your account
        </p>

        <Input
          id="email"
          type="email"
          placeholder="Email"
          autoComplete="email"
          Icon={MailIcon}
          required
          minLength={5}
        />

        <Input
          id="password"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          Icon={LockKeyholeIcon}
          required
          minLength={8}
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
        />

        <Link
          href="/"
          className="w-full p-2 flex items-center justify-center gap-2 text-lg font-medium text-zinc-950 bg-white rounded-lg group-invalid:opacity-70 group-invalid:pointer-events-none"
        >
          Login
        </Link>

        <p className="w-full text-start">
          Don't have an account?
          <Link href="/register" className="ml-1 underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  )
}
