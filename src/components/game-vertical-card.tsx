import { productPriceManager } from '@/helpers/product-price-manager'
import { ProductWithGame } from '@/types/product'
import { Gamepad2Icon } from 'lucide-react'
import Link from 'next/link'

type GameVerticalCardProps = {
  product: ProductWithGame
}

export function GameVerticalCard({ product }: GameVerticalCardProps) {
  const { hasDiscount, discount, originalPrice, finalPrice } =
    productPriceManager(product)

  return (
    <Link
      href={`/store/product/${product.game.id}`}
      className="w-full min-w-[150px] flex flex-col gap-2"
    >
      <div className="aspect-[3/4] overflow-hidden rounded-xl">
        {product.game.imageUrl && (
          <img
            src={product.game.imageUrl}
            alt="game"
            className="size-full object-cover"
          />
        )}
        {!product.game.imageUrl && (
          <div className="size-full bg-zinc-950 flex items-center justify-center px-4">
            <Gamepad2Icon className="text-white size-full shrink-0" />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-base leading-4 sm:text-lg sm:leading-5 font-bold text-white">
          {product.game.title}
        </span>

        <div className="flex items-center gap-1">
          {hasDiscount && (
            <>
              <div className="h-6 px-1.5 flex items-center justify-center rounded-full bg-emerald-800">
                <span className="text-xs sm:text-sm font-medium text-white">
                  {discount}
                </span>
              </div>

              <span className="mr-auto line-through text-sm sm:text-base text-zinc-500">
                {originalPrice}
              </span>
            </>
          )}
          <span className="min-w-max text-sm sm:text-base text-white font-semibold">
            {finalPrice}
          </span>
        </div>
      </div>
    </Link>
  )
}

export function GameVerticalCardSkeleton() {
  return (
    <div className="w-full min-w-[150px] flex flex-col gap-2">
      <div className="aspect-[3/4] overflow-hidden rounded-xl bg-zinc-700 animate-pulse" />

      <div className="flex flex-col gap-1">
        <div className="h-5 sm:h-4 w-3/4 rounded-sm bg-zinc-700 animate-pulse" />

        <div className="h-4 sm:h-6 w-1/3 mt-1 rounded-sm bg-zinc-700 animate-pulse" />
      </div>
    </div>
  )
}
