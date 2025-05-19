import type { Metadata } from 'next'
import '../../globals.css'
import { NavBar, Sidebar } from '@/components/nav-bar'

import { QueryProvider } from '@/lib/query-client-provider'
import { Header } from '@/components/header'
import { Cart } from '@/components/cart'
import { Toaster } from '@/components/ui/toaster'
import { RouteTracker } from '@/components/route-tracker'

export const metadata: Metadata = {
  title: 'Xtreme Go Horse Games',
  description: 'Games store :)',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <QueryProvider>
      <Header />
      <div className="flex-1 w-screen self-start flex overflow-hidden">
        <Sidebar />
        {children}
      </div>
      <Cart />
      <NavBar />
      <Toaster />
      <RouteTracker />
    </QueryProvider>
  )
}
