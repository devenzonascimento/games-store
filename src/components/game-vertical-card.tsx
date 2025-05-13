import { formatCurrency } from '@/helpers/format-currency'
import { Game } from '@/types/game'
import { ProductWithGame } from '@/types/product'
import { Gamepad2Icon } from 'lucide-react'
import Link from 'next/link'

type GameVerticalCardProps = {
  product: ProductWithGame
}

export function GameVerticalCard({ product }: GameVerticalCardProps) {
  return (
    <Link
      href={`product/${product.game.id}`}
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
        <span className="text-base sm:text-lg font-bold text-white">
          {product.game.title}
        </span>

        <p className="line-clamp-3 text-xs sm:text-sm text-zinc-400">
          {product.game.description}
        </p>

        <span className="min-w-max text-sm sm:text-base text-white font-semibold">
          {formatCurrency(product.price)}
        </span>
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

        <div className="space-y-1">
          <div className="h-2.5 w-full rounded-sm bg-zinc-700 animate-pulse" />
          <div className="h-2.5 w-full rounded-sm bg-zinc-700 animate-pulse" />
          <div className="h-2.5 w-2/3 rounded-sm bg-zinc-700 animate-pulse" />
        </div>

        <div className="h-4 sm:h-6 w-1/3 mt-1 rounded-sm bg-zinc-700 animate-pulse" />
      </div>
    </div>
  )
}
