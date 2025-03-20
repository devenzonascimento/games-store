'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselApi,
} from '@/components/ui/carousel'
import { GameBanner } from '@/components/game-banner'
import { Game } from '@/types/game'

type GameBannersCarouselProps = {
  games: Game[]
}

export function GameBannersCarousel({ games }: GameBannersCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className="flex flex-col gap-2">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {games.map(game => (
            <CarouselItem key={game.id}>
              <GameBanner game={game} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Elipssis points */}
      <div className="w-full flex items-center justify-center gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index.toString()}
            className={cn(
              'size-2 rounded-full transition-all duration-500',
              current === index ? 'bg-white' : 'bg-white/50',
            )}
          />
        ))}
      </div>
    </div>
  )
}
