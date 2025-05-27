import { HorseIcon } from '@/components/logo'
import { MailIcon } from 'lucide-react'
import { Input } from '@/components/input'
import { forgotPasswordAction } from '@/actions/forgot-password'
import Link from 'next/link'
import { SubmitButton } from '../../../components/submit-button'

type ForgotPasswordPageProps = {
  searchParams?: Promise<{
    success?: string
    error?: string
  }>
}

export default async function ForgotPasswordPage({
  searchParams,
}: ForgotPasswordPageProps) {
  const params = await searchParams
  const success = params?.success || ''
  const error = params?.error || ''

  return (
    <div className="h-dvh w-dvw flex justify-center bg-zinc-950">
      <form
        action={forgotPasswordAction}
        className="group relative z-10 flex-1 mt-44 px-4 flex flex-col items-center gap-6 sm:max-h-min sm:max-w-[500px] sm:py-4 sm:border sm:border-zinc-600 sm:rounded-lg sm:bg-white/5"
      >
        <HorseIcon className="max-sm:hidden -z-10 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 blur-md w-10/12 h-auto fill-zinc-700" />

        <h1 className="text-xl font-semibold">Forgot your password?</h1>

        <p className="text-sm text-center text-zinc-400">
          Enter your email address and we'll send you a temporary password.
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

        {success && (
          <p className="self-start text-start text-sm text-green-500">
            {decodeURIComponent(success)}
          </p>
        )}

        {error && (
          <p className="self-start text-start text-sm text-red-500">
            {decodeURIComponent(error)}
          </p>
        )}

        <SubmitButton>Send Reset Instructions</SubmitButton>

        <Link
          href="/login"
          className="w-full p-2 flex items-center justify-center gap-2 text-lg font-medium text-white bg-transparent border border-white rounded-lg disabled:opacity-50"
        >
          Back to login
        </Link>
      </form>
    </div>
  )
}
