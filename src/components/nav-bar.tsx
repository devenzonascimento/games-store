'use client'

import Link from 'next/link'
import {
  HomeIcon,
  LayoutGridIcon,
  SettingsIcon,
  ShoppingBasketIcon,
  ShoppingCartIcon,
  UserIcon,
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Cart } from './cart'

export function NavBar() {
  return (
    <nav className="fixed bottom-0 w-full h-16 px-4 flex justify-center bg-zinc-950 border-t border-zinc-800">
      <div className="h-full w-full py-1 grid grid-cols-3">
        <NavLink href="/catalog">
          <LayoutGridIcon className="size-6" />
          <span>Catalog</span>
        </NavLink>

        <NavLink href="/">
          <HomeIcon className="size-6" />
          <span>Home</span>
        </NavLink>

        <Cart>
          <NavLink href="/cart" className='pointer-events-none'>
            <ShoppingCartIcon className="size-6" />
            <span>Cart</span>
          </NavLink>
        </Cart>
      </div>
    </nav>
  )
}

type NavLinkProps = {
  href: string
  children: React.ReactNode
  className?: string
}

function NavLink({ href, children, className }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href || pathname.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      className={cn(
        'flex flex-col items-center justify-center rounded-xl text-xs',
        isActive
          ? '*:stroke-2 text-white font-medium'
          : '*:stroke-1 text-zinc-500 font-normal',
        className,
      )}
    >
      {children}
    </Link>
  )
}
