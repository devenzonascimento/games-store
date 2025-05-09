import { IGDBPlatform } from '@/types/game'
import { MonitorIcon } from 'lucide-react'
import { PlayStationIcon } from './icons/playstation'
import { XboxIcon } from './icons/xbox'
import { cn } from '@/lib/utils'
import { NintendoSwitchIcon } from './icons/nintendo-switch'

type PlatformIconProps = {
  platform: IGDBPlatform
  className?: string
}

export function PlatformIcon({ platform, className }: PlatformIconProps) {
  switch (platform) {
    case IGDBPlatform.PC:
      return <MonitorIcon className={cn(className, 'fill-transparent')} />
    case IGDBPlatform.PlayStation1:
    case IGDBPlatform.PlayStation2:
    case IGDBPlatform.PlayStation3:
    case IGDBPlatform.PlayStation4:
    case IGDBPlatform.PlayStation5:
      return <PlayStationIcon className={className} />
    case IGDBPlatform.Xbox:
    case IGDBPlatform.Xbox360:
    case IGDBPlatform.XboxOne:
    case IGDBPlatform.XboxSeries:
      return <XboxIcon className={className} />
    case IGDBPlatform.NintendoSwitch:
      return <NintendoSwitchIcon className={className} />
  }
}
