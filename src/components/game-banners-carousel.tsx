'use client'

import { useState, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselApi,
} from '@/components/ui/carousel'
import { EmblaCarouselType } from 'embla-carousel'
import { GameBanner } from '@/components/game-banner'
import { useQuery } from '@tanstack/react-query'
import { ProductWithGame } from '@/types/product'
import { usePopulateProductsCache } from '@/hooks/use-populate-products-cache'

export function GameBannersCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(api)

  const { populateCache } = usePopulateProductsCache()

  const { data: products, isPending } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch('/api/igdb/games/banners')

      const result = (await res.json()) as ProductWithGame[]

      populateCache(result)

      return result
    },
    staleTime: Number.POSITIVE_INFINITY,
  })

  useEffect(() => {
    const ref = setInterval(() => {
      if (api) {
        api.scrollTo(selectedIndex + 1)
      }
    }, 4500)

    return () => clearInterval(ref)
  }, [selectedIndex, api])

  if (isPending || !products) {
    return (
      <div className="w-full h-auto aspect-video xl:aspect-[3/1] flex flex-col gap-2 bg-zinc-700 animate-pulse rounded-xl" />
    )
  }

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
          {products.map(product => (
            <CarouselItem
              key={product.id}
              className="sm:basis-9/12 md:basis-8/12 lg:basis-10/12 xl:basis-full rounded-xl"
            >
              <GameBanner product={product} />
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
