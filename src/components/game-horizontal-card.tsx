import Link from 'next/link'
import { PlatformIcon } from './platform-icon'
import { ProductWithGame } from '@/types/product'
import { productPriceManager } from '@/helpers/product-price-manager'

type GameHorizontalCardProps = {
  product: ProductWithGame
}

export function GameHorizontalCard({ product }: GameHorizontalCardProps) {
  const { hasDiscount, discount, originalPrice, finalPrice } =
    productPriceManager(product)

  return (
    <Link
      href={`/store/product/${product.game.id}`}
      className="min-h-max grid grid-cols-[auto_1fr] bg-zinc-800 rounded-md shadow-lg shadow-black cursor-pointer"
    >
      <div className="h-24 aspect-[3/4] overflow-hidden rounded">
        <img
          src={product.game.imageUrl}
          alt={product.game.title}
          className="size-full object-cover"
        />
      </div>

      <div className="py-1 px-2 flex flex-col">
        <span className="text-base font-bold text-white">
          {product.game.title}
        </span>

        <span className="text-sm font-medium text-zinc-300">
          {product?.game.year} - {product?.game.genres?.at(0)}
        </span>

        <div className="mt-auto flex justify-between items-end gap-2">
          <div className="self-end flex gap-1">
            {product.game.platformsAvailable.map(platform => (
              <PlatformIcon
                key={platform}
                platform={platform}
                className="size-4 text-white fill-white shrink-0"
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {hasDiscount && (
              <>
                <div className="h-6 px-1.5 flex items-center justify-center rounded-full bg-emerald-800">
                  <span className="text-xs font-medium text-white">
                    {discount}
                  </span>
                </div>

                <span className="mr-auto line-through text-sm text-zinc-500">
                  {originalPrice}
                </span>
              </>
            )}
            <span className="min-w-max text-sm sm:text-base text-white font-semibold">
              {finalPrice}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export function GameHorizontalCardSkeleton() {
  return (
    <div className="min-h-max grid grid-cols-[auto_1fr] rounded-md">
      <div className="h-24 aspect-[3/4] overflow-hidden rounded bg-zinc-700 animate-pulse" />

      <div className="py-1 px-2 flex flex-col">
        <div className="h-5 w-2/3 rounded-sm bg-zinc-700 animate-pulse" />

        <div className="mt-1 h-4 w-1/2 rounded-sm bg-zinc-700 animate-pulse" />

        <div className="mt-auto flex justify-between items-end gap-2">
          <div className="flex gap-1">
            <div className="size-4 rounded-sm bg-zinc-700 animate-pulse" />
            <div className="size-4 rounded-sm bg-zinc-700 animate-pulse" />
          </div>

          <div className="h-4 w-20 rounded-sm bg-zinc-700 animate-pulse" />
        </div>
      </div>
    </div>
  )
}
