'use client'

import { useCallback, useEffect, useState } from 'react'
import { Tag } from './tag'
import {
  TrophyIcon,
  CalendarIcon,
  SparklesIcon,
  GamepadIcon,
  HeartIcon,
} from 'lucide-react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { PaginatedResponse, Topic } from '@/types/game'
import {
  GameVerticalCard,
  GameVerticalCardSkeleton,
} from './game-vertical-card'
import { ProductWithGame } from '@/types/product'
import { usePopulateProductsCache } from '@/hooks/use-populate-products-cache'

export function GameCards() {
  const [activeTag, setActiveTag] = useState<Topic>('top-rated')

  const { populateCache } = usePopulateProductsCache()

  const fetchProducts = useCallback(
    async (topic: string) => {
      const url = `/api/igdb/games?topic=${topic}&page=${0}&limit=${30}`

      const res = await fetch(url)

      const result = (await res.json()) as PaginatedResponse<ProductWithGame>

      populateCache(result.itens)

      return result.itens
    },
    [populateCache],
  )

  const { data: products, isPending } = useQuery({
    queryKey: ['products', activeTag],
    queryFn: () => fetchProducts(activeTag),
    staleTime: Number.POSITIVE_INFINITY,
  })

  const queryClient = useQueryClient()

  useEffect(() => {
    const prefetchTodos = async () => {
      const topics = [
        'top-rated',
        'best-sellers',
        'new-releases',
        'most-played',
        'most-wishlisted',
        'coming-soon',
      ]

      const promises = []

      for (const topic of topics) {
        const promise = queryClient.prefetchQuery({
          queryKey: ['products', topic],
          queryFn: () => fetchProducts(topic),
        })

        promises.push(promise)
      }

      await Promise.all(promises)
    }

    setTimeout(() => {
      prefetchTodos()
    }, 4000)
  }, [fetchProducts, queryClient])

  return (
    <section className="w-full py-2 px-0 flex flex-col gap-4">
      <div className="px-4 flex items-start gap-2 overflow-x-auto no-scrollbar">
        <Tag
          title="Top Rated"
          Icon={TrophyIcon}
          isActive={'top-rated' === activeTag}
          onClick={() => setActiveTag('top-rated')}
        />
        <Tag
          title="Best Sellers"
          Icon={CalendarIcon}
          isActive={'best-sellers' === activeTag}
          onClick={() => setActiveTag('best-sellers')}
        />
        <Tag
          title="New Releases"
          Icon={SparklesIcon}
          isActive={'new-releases' === activeTag}
          onClick={() => setActiveTag('new-releases')}
        />
        <Tag
          title="Most Played"
          Icon={GamepadIcon}
          isActive={'most-played' === activeTag}
          onClick={() => setActiveTag('most-played')}
        />
        <Tag
          title="Most Wishlisted"
          Icon={HeartIcon}
          isActive={'most-wishlisted' === activeTag}
          onClick={() => setActiveTag('most-wishlisted')}
        />
        <Tag
          title="Coming Soon"
          Icon={CalendarIcon}
          isActive={'coming-soon' === activeTag}
          onClick={() => setActiveTag('coming-soon')}
        />
      </div>

      <div className="w-full px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {isPending &&
          Array.from({ length: 10 }).map((_, index) => (
            <GameVerticalCardSkeleton key={index.toString()} />
          ))}

        {!isPending &&
          products?.map(product => (
            <GameVerticalCard key={product.id} product={product} />
          ))}
      </div>
    </section>
  )
}
