'use client'

import { useRouter } from 'next/navigation'
import { useNavigationStore } from '@/store/navigation-store'

export function useGoBack() {
  const router = useRouter()
  const { currentPath, previousPath } = useNavigationStore()

  const isProductPage = currentPath?.includes('/store/product')

  const goBack = () => {
    if (!isProductPage) {
      return
    }

    if (
      previousPath?.endsWith('/store') ||
      previousPath?.includes('/store/catalog')
    ) {
      router.back()
      return
    }

    router.push('/store')
  }

  return {
    goBack,
  }
}
