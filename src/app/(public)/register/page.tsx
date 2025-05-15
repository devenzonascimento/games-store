'use client'

import { useActionState, useLayoutEffect } from 'react'
import { useRouter } from 'next/navigation'
import { registerAction } from '@/actions/register'
import { HorseIcon } from '@/components/logo'
import {
  LockKeyholeIcon,
  MailIcon,
  UserIcon,
  PhoneIcon,
  IdCardIcon,
} from 'lucide-react'
import { Input } from '@/components/input'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()

  const [state, formAction, pending] = useActionState(registerAction, null)

  useLayoutEffect(() => {
    if (state?.success && state?.user) {
      localStorage.setItem('user', JSON.stringify(state.user))

      router.push('/store')
    }
  }, [state, router])

  return (
    <div className="h-dvh w-dvw flex sm:items-center justify-center bg-zinc-950">
      <form
        action={formAction}
        className="group relative z-10 flex-1 px-4 py-6 flex flex-col items-center gap-6 sm:max-h-min sm:max-w-[500px] sm:py-4 sm:border sm:border-zinc-600 sm:rounded-lg sm:bg-white/5"
      >
        <HorseIcon className="max-sm:hidden -z-10 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 blur-md w-10/12 h-auto fill-zinc-700" />

        <h1 className="text-xl font-semibold">Create your account</h1>

        <p className="text-sm">
          Fill in your information to create your account
        </p>

        <Input
          name="name"
          type="text"
          placeholder="Full Name"
          autoComplete="name"
          Icon={UserIcon}
          required
          minLength={3}
        />

        <Input
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="email"
          Icon={MailIcon}
          required
          minLength={5}
        />

        <Input
          name="document"
          type="text"
          placeholder="Document"
          Icon={IdCardIcon}
          required
          pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}"
          maxLength={14}
        />

        <Input
          name="telephone"
          type="tel"
          placeholder="Phone"
          Icon={PhoneIcon}
          // required
          pattern="\(?\d{2}\)?\s?\d{4,5}-?\d{4}"
          maxLength={15}
        />

        <Input
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          Icon={LockKeyholeIcon}
          required
          minLength={6}
        />

        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          autoComplete="new-password"
          Icon={LockKeyholeIcon}
          required
          minLength={6}
        />

        {state?.error && (
          <p className="self-start text-sm text-rose-500">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full p-2 flex items-center justify-center gap-2 text-lg font-medium text-zinc-950 bg-white rounded-lg group-invalid:opacity-70 group-invalid:pointer-events-none disabled:opacity-50"
        >
          {pending ? 'Creating account...' : 'Create Account'}
        </button>

        <p className="w-full text-start">
          Already have an account?
          <Link href="/login" className="ml-1 underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  )
}
