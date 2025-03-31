'use client'

import { useState, useEffect, useCallback, ComponentPropsWithRef } from 'react'
import { cn } from '@/lib/utils'
import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselApi,
} from '@/components/ui/carousel'
import { EmblaCarouselType } from 'embla-carousel'
import { GameBanner } from '@/components/game-banner'
import { Game } from '@/types/game'

type GameBannersCarouselProps = {
  games: Game[]
}

export function GameBannersCarousel({ games }: GameBannersCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(api)

  return (
    <div className="flex flex-col gap-3">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        setApi={setApi}
      >
        <CarouselContent>
          {games.map(game => (
            <CarouselItem
              key={game.id}
              className="sm:basis-9/12 md:basis-8/12 lg:basis-10/12"
            >
              <GameBanner game={game} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="w-full flex items-center justify-center gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index.toString()}
            type="button"
            className={cn(
              'size-2.5 rounded-full transition-all duration-500',
              selectedIndex === index ? 'bg-white' : 'bg-white/50',
            )}
            onClick={() => onDotButtonClick(index)}
          />
        ))}
      </div>
    </div>
  )
}

type UseDotButtonProps = {
  selectedIndex: number
  scrollSnaps: number[]
  onDotButtonClick: (index: number) => void
}

export const useDotButton = (
  emblaApi: EmblaCarouselType | undefined,
): UseDotButtonProps => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return
      emblaApi.scrollTo(index)
    },
    [emblaApi],
  )

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onInit, onSelect])

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  }
}
