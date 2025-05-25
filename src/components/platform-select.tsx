import * as React from 'react'

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { IGDBPlatform, IGDBPlatformNameMap } from '@/types/game'
import { PlatformIcon } from './platform-icon'

type PlatformSelectProps = {
  platforms: IGDBPlatform[]
  onSelect?: (platform: IGDBPlatform) => void
}

export function PlatformSelect({ platforms, onSelect }: PlatformSelectProps) {
  return (
    <Select
      onValueChange={value =>
        onSelect?.(Number(value) as unknown as IGDBPlatform)
      }
    >
      <SelectTrigger className="h-[44px] w-full text-base border-white rounded-lg outline-none">
        <SelectValue placeholder="Select a platform" className="text-base" />
      </SelectTrigger>

      <SelectContent className="bg-zinc-950">
        {platforms.map(platform => (
          <SelectItem key={platform} value={platform.toString()}>
            <div className="flex items-center gap-2">
              <PlatformIcon
                platform={platform}
                className="size-6 fill-white shrink-0"
              />
              <span className="text-base text-white">
                {IGDBPlatformNameMap[platform]}
              </span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
