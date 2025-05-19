'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useNavigationStore } from '@/store/navigation-store'

export function RouteTracker() {
  const pathname = usePathname()
  const setPaths = useNavigationStore((state) => state.setPaths)

  useEffect(() => {
    setPaths(pathname)
  }, [pathname, setPaths])

  return null
}