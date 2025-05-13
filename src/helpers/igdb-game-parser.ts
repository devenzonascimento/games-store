import { IGDBPlatform, IGDBRawGame } from '@/types/game'
import { Game } from '@/types/game'

const groupByPlatform = (igdbPlatformsIds: number[]) => {
  const result: IGDBPlatform[] = []

  for (const platform of igdbPlatformsIds) {
    switch (platform) {
      case IGDBPlatform.PC:
        result.push(platform)
        break
      case IGDBPlatform.PlayStation1:
      case IGDBPlatform.PlayStation2:
      case IGDBPlatform.PlayStation3:
      case IGDBPlatform.PlayStation4:
      case IGDBPlatform.PlayStation5:
        if (!result.find(p => p === IGDBPlatform.PlayStation5)) {
          result.push(IGDBPlatform.PlayStation5)
        }
        break
      case IGDBPlatform.Xbox:
      case IGDBPlatform.Xbox360:
      case IGDBPlatform.XboxOne:
      case IGDBPlatform.XboxSeries:
        if (!result.find(p => p === IGDBPlatform.XboxSeries)) {
          result.push(IGDBPlatform.XboxSeries)
        }
        break
      case IGDBPlatform.NintendoSwitch:
        result.push(platform)
        break
    }
  }

  return result.sort((a, b) => a - b)
}

export function toGame(raw: IGDBRawGame): Game {
  const year = raw.first_release_date
    ? new Date(raw.first_release_date * 1000).getFullYear()
    : undefined

  return {
    id: raw.id,
    title: raw.name,
    description: raw.summary ?? '',
    platformsAvailable: raw.platforms ? groupByPlatform(raw.platforms) : [],
    imageUrl: raw.cover?.url.replace('t_thumb', 't_cover_big') ?? '',
    bannerUrl: raw.artworks?.[0]?.url.replace('t_thumb', 't_1080p'),
    gallery: raw.screenshots?.map(s =>
      s.url.replace('t_thumb', 't_screenshot_huge'),
    ),
    year,
    genres: raw.genres?.map(g => g.name),
  }
}
