import Link from 'next/link'
import { PlatformIcon } from './platform-icon'
import { Game } from '@/types/game'

type GameBannerProps = {
  game: Game
}

export function GameBanner({ game }: GameBannerProps) {
  return (
    <div className="relative h-auto w-full aspect-video border border-zinc-600 rounded-xl overflow-hidden">
      <img src={game.imageUrl} alt="game" className="size-full object-cover" />

      <Link href={`product/${game.id}`} className="absolute inset-0 size-full p-2 flex flex-col justify-between bg-black/50">
        <div className="self-end flex gap-1">
          {game.platformsAvailable.map(platform => (
            <PlatformIcon
              key={platform}
              platform={platform}
              className="size-4 text-white fill-white shrink-0"
            />
          ))}
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xl font-bold text-white">{game.title}</span>

          <div className="flex gap-2 items-end">
            <p className="line-clamp-2 text-xs text-zinc-400">
              {game.description}
            </p>

            <span className="min-w-max text-white font-semibold">
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                maximumFractionDigits: 2,
              }).format(game.price)}
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}
