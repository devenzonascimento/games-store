'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { EmblaCarouselType } from 'embla-carousel'

export function ScreenshotCarrousel({
  screenshots,
}: { screenshots: string[] }) {
  const [api, setApi] = useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!api) return

    onSelect(api)

    api.on('reInit', onSelect).on('select', onSelect)
  }, [api, onSelect])

  useEffect(() => {
    const ref = setInterval(() => {
      if (api) {
        api.scrollTo(selectedIndex + 1)
      }
    }, 3000)

    return () => clearInterval(ref)
  }, [selectedIndex, api])

  return (
    <div className="w-full flex flex-col gap-3">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        setApi={setApi}
      >
        <CarouselContent>
          {screenshots.map(screenshot => (
            <CarouselItem
              key={screenshot}
              className="sm:basis-9/12 md:basis-8/12 lg:basis-10/12 xl:basis-full"
            >
              <div className="relative h-auto w-full aspect-video border border-zinc-600 rounded-xl overflow-hidden">
                <img
                  src={screenshot}
                  alt="game-screenshot"
                  className="size-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
