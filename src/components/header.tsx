'use client'

import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cart-store'
import { Logo } from './logo'
import { LogOutIcon, ShoppingCartIcon, UserPlus } from 'lucide-react'
import { useLayoutEffect, useState } from 'react'
import { User } from '@/types/user'

export function Header() {
  const router = useRouter()

  const { openCart, getTotalItems } = useCartStore()

  const [user, setUser] = useState<User>()
  const [isOpen, setIsOpen] = useState(false)

  const isAuthenticated = () => !!user

  const handleToggleLogoutDropdown = () => {
    setIsOpen(isOpen => !isOpen)
  }

  const handleLogout = () => {
    localStorage.removeItem('user')

    router.push('/login')
  }

  useLayoutEffect(() => {
    const result = localStorage.getItem('user')

    if (!result) {
      router.push('/login')
      return
    }

    const user: User = JSON.parse(result)

    setUser(user)
  }, [router])

  return (
    <header className="p-2 w-full flex items-center justify-between min-h-16 bg-zinc-950 border-b border-b-zinc-600">
      <Logo />

      <div className="flex items-center gap-1">
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

        {isAuthenticated() ? (
          <div className="relative size-12 p-1">
            <button
              type="button"
              onClick={handleToggleLogoutDropdown}
              className="size-full flex items-center justify-center text-base font-bold text-white bg-zinc-700 rounded-full"
            >
              EN
            </button>

            {isOpen && (
              <>
                <div
                  className="fixed inset-0 z-10 h-dvh w-dwh overflow-hidden touch-none"
                  onMouseDown={() => setIsOpen(false)}
                />

                <div className="absolute top-full right-0 z-10 p-2 bg-zinc-700 rounded-md shadow-xl">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="p-1 flex items-center gap-1"
                  >
                    <LogOutIcon className="size-5 text-white shrink-0" />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <button
            type="button"
            className="size-12 flex items-center justify-center"
            onClick={() => router.push('/login')}
          >
            <UserPlus className="text-white size-6 shrink-0" />
          </button>
        )}
      </div>
    </header>
  )
}
