import type { Metadata } from 'next'
import '../globals.css'
import { NavBar, Sidebar } from '@/components/nav-bar'
import { Logo } from '@/components/logo'

import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: true,
  fallback: ['sans-serif'],
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className="relative h-[100dvh] w-screen antialiased flex flex-col items-center bg-zinc-900"
        style={{ ...roboto.style }}
      >
        <header className="py-2 w-full flex items-center justify-between min-h-16 bg-zinc-950 border-b border-b-zinc-600">
          <Logo />
        </header>
        <div className="flex-1 w-screen self-start flex overflow-hidden">
          <Sidebar />
          {children}
        </div>
        <NavBar />
      </body>
    </html>
  )
}
