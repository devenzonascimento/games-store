'use client'

import Link from 'next/link'
import {
  HomeIcon,
  LayoutGridIcon,
  SettingsIcon,
  ShoppingBasketIcon,
  UserIcon,
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function NavBar() {
  return (
    <nav className="fixed bottom-0 w-full h-16 px-4 flex justify-center bg-zinc-950 border-t border-zinc-800">
      <div className="h-full w-max py-1 flex items-center justify-between gap-4">
        <NavLink href="/settings">
          <SettingsIcon className="size-6" />
          <span>Ajustes</span>
        </NavLink>

        <NavLink href="/profile">
          <UserIcon className="size-6" />
          <span>Perfil</span>
        </NavLink>

        <NavLink href="/">
          <HomeIcon className="size-6" />
          <span>Início</span>
        </NavLink>

        <NavLink href="/catalog">
          <LayoutGridIcon className="size-6" />
          <span>Catálogo</span>
        </NavLink>

        <NavLink href="/basket">
          <ShoppingBasketIcon className="size-6" />
          <span>Cesta</span>
        </NavLink>
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
        'h-full aspect-square flex flex-col items-center justify-center rounded-xl text-xs',
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
