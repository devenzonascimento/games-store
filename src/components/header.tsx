'use client'

import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cart-store'
import { Logo } from './logo'
import { ShoppingCartIcon, UserPlus } from 'lucide-react'

export function Header() {
  const router = useRouter()
  const { openCart, getTotalItems } = useCartStore()

  return (
    <header className="p-2 w-full flex items-center justify-between min-h-16 bg-zinc-950 border-b border-b-zinc-600">
      <Logo />

      <div className="flex items-center">
        <button
          type="button"
          className="relative size-12 flex items-center justify-center"
          onClick={openCart}
        >
          <ShoppingCartIcon className="text-white size-6 shrink-0" />

          <span className="absolute top-1 right-0 h-4 min-w-4 text-xs font-bold text-zinc-950 bg-white rounded-full">
            {getTotalItems()}
          </span>
        </button>

        <button
          type="button"
          className="size-12 flex items-center justify-center"
          onClick={() => router.push('/login')}
        >
          <UserPlus className="text-white size-6 shrink-0" />
        </button>
      </div>
    </header>
  )
}
