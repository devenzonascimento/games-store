'use client'

import { UserPlus } from 'lucide-react'
import { Logo } from './logo'
import { useRouter } from 'next/navigation'

export function Header() {
  const router = useRouter()

  return (
    <header className="p-2 w-full flex items-center justify-between min-h-16 bg-zinc-950 border-b border-b-zinc-600">
      <Logo />

      <button
        type="button"
        className="size-12 flex items-center justify-center"
        onClick={() => router.push("/login")}
      >
        <UserPlus className="text-white size-6 shrink-0" />
      </button>
    </header>
  )
}
