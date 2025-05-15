import type { Metadata } from 'next'
import '../../globals.css'
import { NavBar, Sidebar } from '@/components/nav-bar'

import { Roboto } from 'next/font/google'
import { QueryProvider } from '@/lib/query-client-provider'
import { Header } from '@/components/header'
import { Cart } from '@/components/cart'
import { Toaster } from '@/components/ui/toaster'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: true,
  fallback: ['sans-serif'],
})

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
    </QueryProvider>
  )
}
