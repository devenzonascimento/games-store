'use client'

import { SearchIcon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { Game, PaginatedResponse } from '@/types/game'
import {
  GameHorizontalCard,
  GameHorizontalCardSkeleton,
} from '@/components/game-horizontal-card'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { useEffect, useLayoutEffect, useRef } from 'react'

export default function Catalog() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const search = searchParams.get('search') ?? ''

  // TODO: Talvez implementar um InfiniteQuery
  const { data: games, isPending } = useQuery({
    queryKey: ['games', search],
    queryFn: async () => {
      const url = search
        ? `/api/igdb/games/catalog?search=${encodeURIComponent(search)}`
        : '/api/igdb/games'

      const res = await fetch(url)

      const result = (await res.json()) as PaginatedResponse<Game>

      return result.games
    },
  })

  useLayoutEffect(() => {
    if (searchRef.current) {
      searchRef.current.value = search
    }
  }, [search])

  const searchRef = useRef<HTMLInputElement>(null)

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams)
    if (searchRef.current?.value) {
      params.set('search', searchRef.current?.value)
    } else {
      params.delete('search')
    }
    router.push(`?${params.toString()}`)
  }

  return (
    <main className="w-full flex-1 flex flex-col bg-zinc-900 overflow-hidden">
      <section className="w-full p-4">
        <div className="p-2 flex items-center gap-2 bg-zinc-800 border border-zinc-600 rounded-xl">
          <SearchIcon />
          <input
            ref={searchRef}
            type="text"
            defaultValue={search}
            placeholder="Search games..."
            className="flex-1 bg-transparent text-base text-white placeholder:text-zinc-500 outline-none"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleSearch()
              }
            }}
          />
        </div>
      </section>

      <section className="flex-1 flex flex-col gap-3 p-4 overflow-y-auto max-lg:no-scrollbar">
        {isPending &&
          Array.from({ length: 10 }).map((_, index) => (
            <GameHorizontalCardSkeleton key={index.toString()} />
          ))}

        {!isPending &&
          games?.map(game => <GameHorizontalCard key={game.id} game={game} />)}

        {!isPending && games?.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center text-zinc-400">
            <SearchIcon className="w-12 h-12" />
            <p className="text-lg">No games found matching your search.</p>
            <p className="text-sm">Try searching with different keywords.</p>
          </div>
        )}
      </section>
    </main>
  )
}
