import { Platform } from '@/types/game'
import { MonitorIcon } from 'lucide-react'
import { PlayStationIcon } from './icons/playstation'
import { XboxIcon } from './icons/xbox'
import { cn } from '@/lib/utils'
import { NintendoSwitchIcon } from './icons/nintendo-switch'

type PlatformIconProps = {
  platform: Platform
  className?: string
}

export function PlatformIcon({ platform, className }: PlatformIconProps) {
  switch (platform) {
    case Platform.Pc:
      return <MonitorIcon className={cn(className, 'fill-transparent')} />
    case Platform.PlayStation:
      return <PlayStationIcon className={className} />
    case Platform.Xbox:
      return <XboxIcon className={className} />
    case Platform.NintendoSwitch:
      return <NintendoSwitchIcon className={className} />
  }
}
