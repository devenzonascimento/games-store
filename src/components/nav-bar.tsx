'use client'

import Link from 'next/link'
import { HomeIcon, LayoutGridIcon, ShoppingCartIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Cart } from './cart'
import { cva } from 'class-variance-authority'

export function NavBar() {
  return (
    <nav className="lg:hidden w-full h-16 px-4 flex justify-center bg-zinc-950 border-t border-zinc-800">
      <div className="h-full w-full py-1 grid grid-cols-3">
        <NavLink variant="navbar" href="/catalog">
          <LayoutGridIcon className="size-6" />
          <span>Catalog</span>
        </NavLink>

        <NavLink variant="navbar" href="/">
          <HomeIcon className="size-6" />
          <span>Home</span>
        </NavLink>

        <Cart>
          <NavLink
            variant="navbar"
            href="/cart"
            className="pointer-events-none"
          >
            <ShoppingCartIcon className="size-6" />
            <span>Cart</span>
          </NavLink>
        </Cart>
      </div>
    </nav>
  )
}

const navLinkVariants = cva('', {
  variants: {
    variant: {
      navbar:
        'flex flex-col items-center justify-center rounded-xl *:stroke-1  text-xs font-normal text-zinc-500 aria-selected:*:stroke-2 aria-selected:text-white aria-selected:font-medium',
      sidebar:
        'p-2 flex items-center gap-2 rounded-lg hover:bg-zinc-700 aria-selected:bg-zinc-800 aria-selected:font-medium',
    },
  },
  defaultVariants: {
    variant: 'sidebar',
  },
})

type NavLinkProps = {
  href: string
  children: React.ReactNode
  className?: string
  variant: 'navbar' | 'sidebar'
}

function NavLink({ href, children, variant, className }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href || pathname.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      aria-selected={isActive}
      className={cn(navLinkVariants({ variant, className }))}
    >
      {children}
    </Link>
  )
}

export function Sidebar() {
  return (
    <aside className="max-lg:hidden w-44 h-full py-4 px-2 border-r border-r-zinc-600 bg-zinc-950">
      <NavLink variant="sidebar" href="/">
        <HomeIcon className="size-5" />
        <span>Home</span>
      </NavLink>

      <NavLink variant="sidebar" href="/catalog">
        <LayoutGridIcon className="size-5" />
        <span>Catalog</span>
      </NavLink>

      <Cart>
        <NavLink variant="sidebar" href="/cart" className="pointer-events-none">
          <ShoppingCartIcon className="size-5" />
          <span>Cart</span>
        </NavLink>
      </Cart>
    </aside>
  )
}
