'use client'

import { PlatformIcon } from '@/components/platform-icon'
import { useCartStore } from '@/store/cart-store'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeftIcon, Gamepad2Icon, ShoppingCartIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import { DiscountType, ProductWithGame } from '@/types/product'
import { toast } from '@/hooks/use-toast'
import { ToastAction } from '@/components/ui/toast'
import { formatCurrency } from '@/helpers/format-currency'
import { formatPercentage } from '@/helpers/format-percentage'
import { ScreenshotCarrousel } from './screenshots-carrousel'
import { useGoBack } from '@/hooks/use-go-back'

export default function ProductPage() {
  const { goBack } = useGoBack()
  const { id } = useParams()
  const { openCart, addItem } = useCartStore()

  const { data: product, isPending } = useQuery({
    queryKey: ['game', id],
    queryFn: async () => {
      const res = await fetch(`/api/igdb/games/${id}`)

      const product: ProductWithGame = await res.json()

      return product
    },
    staleTime: Number.POSITIVE_INFINITY,
  })

  if (isPending || !product) {
    return <ProductLoading />
  }

  return (
    <main className="relative flex-1 flex flex-col items-center justify-start gap-6 py-6 px-4 bg-zinc-900 overflow-y-auto">
      <button type="button" onClick={goBack}>
        <ArrowLeftIcon className="absolute top-2 left-2 size-8" />
      </button>

      <div className="flex-1 flex flex-col items-center justify-start gap-6 md:max-w-[768px]">
        <div className="min-h-[280px] aspect-[3/4] overflow-hidden rounded-xl">
          <img
            src={product.game.imageUrl}
            alt={product.game.title}
            className="size-full object-cover"
          />
        </div>

        <h1 className="text-center text-2xl font-bold text-white">
          {product.game.title}
        </h1>

        <div className="w-full flex items-center justify-center gap-4 px-4">
          {product.discountValue && (
            <>
              <div className="h-6 px-2 pt-0.5 flex items-center justify-center rounded-full bg-emerald-800">
                {product.discountType === DiscountType.Percentage && (
                  <span className="text-base font-medium text-white">
                    {formatPercentage(-product.discountValue)}
                  </span>
                )}

                {product.discountType === DiscountType.Fixed && (
                  <span className="text-base font-medium text-white">
                    {formatCurrency(-product.discountValue)}
                  </span>
                )}
              </div>

              <span className="line-through text-sm text-zinc-500">
                {formatCurrency(product.price)}
              </span>
            </>
          )}

          <span className="text-xl font-bold text-white">
            {formatCurrency(
              product.discountType === DiscountType.Percentage
                ? product.price - product.price * product.discountValue
                : product.price - product.discountValue,
            )}
          </span>
        </div>

        <div className="w-full flex flex-col items-center gap-4">
          <button
            type="button"
            className="w-full p-2 flex items-center justify-center gap-2 text-lg font-medium text-zinc-950 bg-white rounded-lg sm:hover:opacity-70"
            onClick={async () => {
              await addItem({
                id: product.id,
                price: product.price,
                discountValue: product.discountValue,
                discountType: product.discountType,
                game: {
                  id: product.id,
                  title: product.game.title,
                  imageUrl: product.game.imageUrl,
                  platformsAvailable: product.game.platformsAvailable,
                },
              })
              openCart()
            }}
          >
            <Gamepad2Icon className="size-6 text-zinc-950 shrink-0" />
            Buy now
          </button>

          <button
            type="button"
            className="w-full p-2 flex items-center justify-center gap-2 text-lg font-medium text-white bg-transparent border border-white rounded-lg sm:hover:opacity-70"
            onClick={() => {
              addItem({
                id: product.id,
                price: product.price,
                discountValue: product.discountValue,
                discountType: product.discountType,
                game: {
                  id: product.id,
                  title: product.game.title,
                  imageUrl: product.game.imageUrl,
                  platformsAvailable: product.game.platformsAvailable,
                },
              })

              const { dismiss } = toast({
                title: 'Game added to cart!',
                description: `${product.game.title} has been successfully added to your cart.`,
                action: (
                  <ToastAction
                    altText="Go to cart"
                    onClick={openCart}
                    onMouseDown={openCart}
                  >
                    View Cart
                  </ToastAction>
                ),
              })

              setTimeout(() => dismiss(), 1000)
            }}
          >
            <ShoppingCartIcon className="size-6 shrink-0" />
            Add to cart
          </button>
        </div>

        <section className="w-full flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-white">
            Available platforms
          </h2>

          <div className="ml-1 flex items-center gap-2">
            {product.game.platformsAvailable.map(platform => (
              <PlatformIcon
                key={platform}
                platform={platform}
                className="size-6 fill-white shrink-0"
              />
            ))}
          </div>
        </section>

        <section className="w-full flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-white">Genres</h2>

          <div className="flex flex-wrap items-center gap-1 ">
            {product.game.genres?.map(genre => (
              <div
                key={genre}
                className="ml-1 px-2 py-1 text-sm font-medium text-white border border-zinc-600 rounded-md max-w-min min-w-max"
              >
                {genre}
              </div>
            ))}
          </div>
        </section>

        <section className="w-full flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-white">About the game</h2>

          <p className="ml-1 text-base text-zinc-300">
            {product.game.description}
          </p>
        </section>

        <section className="w-full grid grid-rows-[auto_1fr] grid-cols-1 gap-2">
          <h2 className="text-xl font-semibold text-white">Screenshots</h2>

          <ScreenshotCarrousel screenshots={product.game.gallery ?? []} />
        </section>
      </div>
    </main>
  )
}

function ProductLoading() {
  return (
    <div className="flex-1 flex flex-col items-center py-6 px-4 overflow-y-auto">
      <div className="w-full flex-1 flex flex-col items-center justify-start gap-6 md:max-w-[768px]">
        <div className="min-h-[280px] aspect-[3/4] overflow-hidden rounded-xl">
          <div className="w-[264px] h-[352px] bg-zinc-700 animate-pulse" />
        </div>

        <div className="h-8 w-7/12 bg-zinc-700 rounded-md animate-pulse" />

        <div className="h-7 w-20 bg-zinc-700 rounded-md animate-pulse" />

        <div className="w-full flex flex-col gap-4">
          <div className="h-[46px] w-full bg-zinc-700 rounded-lg animate-pulse" />

          <div className="h-[46px] w-full bg-zinc-700 rounded-lg animate-pulse" />
        </div>

        <div className="w-full flex flex-col gap-1">
          <div className="h-7 w-44 bg-zinc-700 rounded-md animate-pulse" />

          <div className="ml-0.5 flex items-center gap-1">
            <div className="size-7 bg-zinc-700 rounded-md animate-pulse" />
            <div className="size-7 bg-zinc-700 rounded-md animate-pulse" />
            <div className="size-7 bg-zinc-700 rounded-md animate-pulse" />
          </div>
        </div>

        <div className="w-full flex flex-col gap-1">
          <div className="h-7 w-16 bg-zinc-700 rounded-md animate-pulse" />

          <div className="ml-0.5 flex items-center gap-2">
            <div className="h-8 w-36 bg-zinc-700 rounded-md animate-pulse" />
            <div className="h-8 w-20 bg-zinc-700 rounded-md animate-pulse" />
          </div>
        </div>

        <div className="w-full flex flex-col gap-2">
          <div className="h-7 w-36 bg-zinc-700 rounded-md animate-pulse" />

          <div className="flex flex-col gap-1">
            <div className="h-5 w-12/12 bg-zinc-700 rounded-md animate-pulse" />
            <div className="h-5 w-11/12 bg-zinc-700 rounded-md animate-pulse" />
            <div className="h-5 w-10/12 bg-zinc-700 rounded-md animate-pulse" />
            <div className="h-5 w-12/12 bg-zinc-700 rounded-md animate-pulse" />
            <div className="h-5 w-12/12 bg-zinc-700 rounded-md animate-pulse" />
            <div className="h-5 w-11/12 bg-zinc-700 rounded-md animate-pulse" />
            <div className="h-5 w-10/12 bg-zinc-700 rounded-md animate-pulse" />
            <div className="h-5 w-10/12 bg-zinc-700 rounded-md animate-pulse" />
            <div className="h-5 w-11/12 bg-zinc-700 rounded-md animate-pulse" />
            <div className="h-5 w-10/12 bg-zinc-700 rounded-md animate-pulse" />
            <div className="h-5 w-12/12 bg-zinc-700 rounded-md animate-pulse" />
            <div className="h-5 w-10/12 bg-zinc-700 rounded-md animate-pulse" />
            <div className="h-5 w-9/12 bg-zinc-700 rounded-md animate-pulse" />
            <div className="h-5 w-10/12 bg-zinc-700 rounded-md animate-pulse" />
            <div className="h-5 w-11/12 bg-zinc-700 rounded-md animate-pulse" />
            <div className="h-5 w-12/12 bg-zinc-700 rounded-md animate-pulse" />
            <div className="h-5 w-12/12 bg-zinc-700 rounded-md animate-pulse" />
            <div className="h-5 w-10/12 bg-zinc-700 rounded-md animate-pulse" />
            <div className="h-5 w-11/12 bg-zinc-700 rounded-md animate-pulse" />
          </div>
        </div>

        <div className="w-full flex flex-col gap-2">
          <div className="h-7 w-28 bg-zinc-700 rounded-md animate-pulse" />

          <div className="w-full aspect-video overflow-hidden rounded-xl">
            <div className="size-full bg-zinc-700 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}
