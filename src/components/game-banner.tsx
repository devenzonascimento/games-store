import { MonitorIcon } from 'lucide-react'
import { PlayStationIcon } from './icons/playstation'
import { XboxIcon } from './icons/xbox'
import { Game, Platform } from '@/types/game'

type GameBannerProps = {
  game: Game
}

export function GameBanner({ game }: GameBannerProps) {
  const renderPlatformIcon = (platform: Platform) => {
    switch (platform) {
      case Platform.Pc:
        return <MonitorIcon key="pc" className="size-4 text-white shrink-0" />
      case Platform.PlayStation:
        return (
          <PlayStationIcon
            key="playstation"
            className="size-4 fill-white shrink-0"
          />
        )
      case Platform.Xbox:
        return <XboxIcon key="xbox" className="size-4 fill-white shrink-0" />
    }
  }

  return (
    <div className="relative h-auto w-full aspect-video border border-zinc-600 rounded-xl overflow-hidden">
      <img src={game.imageUrl} alt="game" className="size-full object-cover" />

      <div className="absolute inset-0 size-full p-2 flex flex-col justify-between bg-black/50">
        <div className="self-end flex gap-1">
          {game.platformsAvaliable.map(renderPlatformIcon)}
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
      </div>
    </div>
  )
}
