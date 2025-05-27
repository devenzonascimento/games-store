import { loginAction } from '@/actions/login'
import { HorseIcon } from '@/components/logo'
import { LockKeyholeIcon, MailIcon } from 'lucide-react'
import { Input } from '@/components/input'
import Link from 'next/link'
import { SubmitButton } from '@/components/submit-button'

type LoginPageProps = {
  searchParams?: Promise<{ error?: string }>
}

export default async function LoginPage(props: LoginPageProps) {
  const searchParams = await props?.searchParams
  const error = searchParams?.error || ''

  return (
    <div className="h-dvh w-dvw flex justify-center bg-zinc-950">
      <form
        action={loginAction}
        className="group relative z-10 flex-1 mt-44 px-4 flex flex-col items-center gap-6 sm:max-h-min sm:max-w-[500px] sm:py-4 sm:border sm:border-zinc-600 sm:rounded-lg sm:bg-white/5"
      >
        <HorseIcon className="max-sm:hidden -z-10 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 blur-md w-10/12 h-auto fill-zinc-700" />

        <h1 className="text-xl font-semibold">
          Welcome to Xtreme Go Horse Games!
        </h1>

        <p className="text-sm">
          Enter your email below to login to your account
        </p>

        <Input
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="email"
          Icon={MailIcon}
          required
          minLength={5}
          helpMessage="Enter a valid email address"
        />

        <Input
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          Icon={LockKeyholeIcon}
          required
        />

        {error && (
          <p className="self-start text-start text-sm text-red-500">
            {decodeURIComponent(error)}
          </p>
        )}

        <Link
          href="/forgot-password"
          className="self-start text-start underline"
        >
          Forgot password?
        </Link>

        <SubmitButton>Login</SubmitButton>

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
