'use client'

import Link from 'next/link'
import { ArrowLeftCircle, HomeIcon, LayoutGridIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { useNavigationStore } from '@/store/navigation-store'

export function NavBar() {
  return (
    <nav className="lg:hidden w-full h-16 px-4 flex justify-center bg-zinc-950 border-t border-zinc-800 touch-none">
      <div className="h-full w-full py-1 grid grid-cols-2 items-center justify-items-center">
        <NavLink variant="navbar" href="/store/catalog">
          <LayoutGridIcon className="size-6" />
          <span>Catalog</span>
        </NavLink>

        <NavLink variant="navbar" href="/store">
          <HomeIcon className="size-6" />
          <span>Home</span>
        </NavLink>
      </div>
    </nav>
  )
}

const navLinkVariants = cva('', {
  variants: {
    variant: {
      navbar:
        'relative max-w-max flex flex-col items-center justify-center rounded-xl *:stroke-1  text-xs font-normal text-zinc-500 aria-selected:*:stroke-2 aria-selected:text-white aria-selected:font-medium',
      sidebar:
        'relative p-2 flex items-center gap-2 rounded-lg hover:bg-zinc-800 aria-selected:bg-zinc-700 aria-selected:font-medium',
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
  const isActive = pathname === href // || pathname.startsWith(`${href}/`)

  const { currentPath, previousPath } = useNavigationStore()

  const isProductPage = currentPath?.includes('/store/product')
  const isPreviousPath = href?.includes('/catalog')
    ? previousPath?.includes(href)
    : previousPath?.endsWith(href)

  return (
    <Link
      href={href}
      aria-selected={isActive}
      className={cn(navLinkVariants({ variant, className }))}
    >
      {children}
      {isProductPage && isPreviousPath && (
        <ArrowLeftCircle
          className={cn(
            'absolute text-white',
            variant === 'navbar' && 'size-4 -top-1 -right-4',
            variant === 'sidebar' && 'size-5 top-1/2 right-2 -translate-y-1/2',
          )}
        />
      )}
    </Link>
  )
}

export function Sidebar() {
  return (
    <aside className="max-lg:hidden w-56 h-full py-4 px-2 border-r border-r-zinc-600 bg-zinc-950">
      <NavLink variant="sidebar" href="/store">
        <HomeIcon className="size-5" />
        <span>Home</span>
      </NavLink>

      <NavLink variant="sidebar" href="/store/catalog">
        <LayoutGridIcon className="size-5" />
        <span>Catalog</span>
      </NavLink>
    </aside>
  )
}
