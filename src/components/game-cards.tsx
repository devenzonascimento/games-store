'use client'

import { useState } from 'react'
import { Tag } from './tag'
import {
  TrophyIcon,
  CalendarIcon,
  SparklesIcon,
  GamepadIcon,
  HeartIcon,
} from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { Game, Topic } from '@/types/game'
import {
  GameVerticalCard,
  GameVerticalCardSkeleton,
} from './game-vertical-card'

type PaginatedResponse<T> = {
  page: number
  limit: number
  games: T[]
}

export function GameCards() {
  const [activeTag, setActiveTag] = useState<Topic>('top-rated')

  const { data: games, isPending } = useQuery({
    queryKey: ['games', activeTag],
    queryFn: async () => {
      const url = `/api/igdb/games?topic=${activeTag}&page=${0}&limit=${30}`

      const res = await fetch(url)

      const result = (await res.json()) as PaginatedResponse<Game>

      return result.games
    },
  })

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

      <div className="w-full px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
        {isPending &&
          Array.from({ length: 10 }).map((_, index) => (
            <GameVerticalCardSkeleton key={index.toString()} />
          ))}

        {!isPending &&
          games?.map(game => <GameVerticalCard key={game.id} game={game} />)}
      </div>
    </section>
  )
}
