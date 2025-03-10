import type { Metadata } from 'next'
import '../../globals.css'

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
    <html lang="en" className="dark overflow-hidden">
      <body className="relative h-[100dvh] w-screen antialiased overflow-hidden">
        {children}
      </body>
    </html>
  )
}
