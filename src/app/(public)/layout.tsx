import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import '../globals.css'

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
    <html lang="en" className="dark">
      <body
        className="relative h-[100dvh] w-screen antialiased flex flex-col items-center bg-zinc-900"
        style={{ ...roboto.style }}
      >
        <main className="flex-1 w-screen self-start flex flex-col items-center overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  )
}
