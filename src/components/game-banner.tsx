import { MonitorIcon } from 'lucide-react'
import { PlayStationIcon } from './icons/playstation'
import { XboxIcon } from './icons/xbox'
import { Platform } from '@/types/game'

type GameBannerProps = {
  imageUrl: string
  title: string
  description: string
  price: number
  platformsAvaliable: Platform[]
}

export function GameBanner({
  imageUrl,
  title,
  description,
  price,
  platformsAvaliable,
}: GameBannerProps) {
  const renderPlatformIcon = (platform: Platform) => {
    switch (platform) {
      case Platform.Pc:
        return <MonitorIcon className="size-4 text-white shrink-0" />
      case Platform.PlayStation:
        return <PlayStationIcon className="size-4 fill-white shrink-0" />
      case Platform.Xbox:
        return <XboxIcon className="size-4 fill-white shrink-0" />
    }
  }

  return (
    <div className="relative h-auto w-full aspect-video border border-zinc-600 rounded-xl overflow-hidden">
      <img src={imageUrl} alt="game" className="size-full object-cover" />

      <div className="absolute inset-0 size-full p-2 flex flex-col justify-between bg-black/50">
        <div className="self-end flex gap-1">
          {platformsAvaliable.map(renderPlatformIcon)}
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xl font-bold text-white">{title}</span>

          <div className="flex gap-2 items-end">
            <p className="line-clamp-2 text-xs text-zinc-400">{description}</p>

            <span className="min-w-max text-white font-semibold">
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                maximumFractionDigits: 2,
              }).format(price)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
