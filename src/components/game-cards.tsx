'use client'

import { useState } from 'react'
import { Tag } from './tag'
import { TrophyIcon, CalendarIcon, SparklesIcon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { Game } from '@/types/game'
import {
  GameVerticalCard,
  GameVerticalCardSkeleton,
} from './game-vertical-card'

export function GameCards() {
  const [activeTag, setActiveTag] = useState('Winner')

  const { data: mockGameCards, isPending } = useQuery({
    queryKey: ['games', activeTag],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/game`)

      const games = (await res.json()) as Game[]

      return games
    },
  })

  return (
    <section className="w-full py-2 px-0 flex flex-col gap-4">
      <div className="px-4 flex items-start gap-2 overflow-x-auto no-scrollbar">
        <Tag
          title="Winner"
          Icon={TrophyIcon}
          isActive={'Winner' === activeTag}
          onClick={() => setActiveTag('Winner')}
        />
        <Tag
          title="Best Sellers"
          Icon={CalendarIcon}
          isActive={'Best Sellers' === activeTag}
          onClick={() => setActiveTag('Best Sellers')}
        />
        <Tag
          title="New Releases"
          Icon={SparklesIcon}
          isActive={'New Releases' === activeTag}
          onClick={() => setActiveTag('New Releases')}
        />
      </div>

      <div className="w-full px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {isPending &&
          Array.from({ length: 10 }).map((_, index) => (
            <GameVerticalCardSkeleton key={index.toString()} />
          ))}

        {!isPending &&
          mockGameCards?.map(game => (
            <GameVerticalCard key={game.id} game={game} />
          ))}
      </div>
    </section>
  )
}
