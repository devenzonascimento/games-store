import { Game } from '@/types/game'
import Link from 'next/link'

type GameVerticalCardProps = {
  game: Game
}

export function GameVerticalCard({ game }: GameVerticalCardProps) {
  return (
    <Link
      href={`product/${game.id}`}
      className="w-full min-w-[150px] flex flex-col gap-2 active:scale-105 transition-transform duration-300 delay-200"
    >
      <div className="aspect-[3/4] overflow-hidden rounded-xl">
        <img
          src={game.imageUrl}
          alt="game"
          className="size-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-base sm:text-lg font-bold text-white">
          {game.title}
        </span>

        <p className="line-clamp-3 text-xs sm:text-sm text-zinc-400">
          {game.description}
        </p>

        <span className="min-w-max text-sm sm:text-base text-white font-semibold">
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            maximumFractionDigits: 2,
          }).format(game.price)}
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
