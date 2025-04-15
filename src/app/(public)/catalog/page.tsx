'use client'

import { useState } from 'react'
import { SearchIcon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { Game } from '@/types/game'
import {
  GameHorizontalCard,
  GameHorizontalCardSkeleton,
} from '@/components/game-horizontal-card'

export default function Catalog() {
  const [searchValue, setSearchValue] = useState('')

  const { data: games, isPending } = useQuery({
    queryKey: ['games'],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/game`)

      const games = (await res.json()) as Game[]

      return games
    },
  })

  return (
    <main className="w-full flex-1 flex flex-col bg-zinc-900 overflow-hidden">
      <section className="w-full p-4">
        <div className="p-2 flex items-center gap-2 bg-zinc-800 border border-zinc-600 rounded-xl">
          <SearchIcon />
          <input
            type="text"
            placeholder="Buscar..."
            className="flex-1 bg-transparent text-base text-white placeholder:text-zinc-500 outline-none"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          />
        </div>
      </section>

      <section className="flex flex-col gap-3 p-4 overflow-y-auto max-lg:no-scrollbar">
        {isPending &&
          Array.from({ length: 10 }).map((_, index) => (
            <GameHorizontalCardSkeleton key={index.toString()} />
          ))}

        {!isPending &&
          games?.map(game => <GameHorizontalCard key={game.id} game={game} />)}
      </section>
    </main>
  )
}
