export type Topic =
  | 'top-rated'
  | 'best-sellers'
  | 'new-releases'
  | 'most-played'
  | 'most-wishlisted'
  | 'coming-soon'

export enum IGDBPlatform {
  PC = 6,
  PlayStation1 = 7,
  PlayStation2 = 8,
  PlayStation3 = 9,
  PlayStation4 = 48,
  PlayStation5 = 167,
  Xbox = 11,
  Xbox360 = 12,
  XboxOne = 49,
  XboxSeries = 169,
  NintendoSwitch = 130,
}

export const IGDBPlatformNameMap: Record<IGDBPlatform, string> = {
  [IGDBPlatform.PC]: 'PC',
  [IGDBPlatform.PlayStation1]: 'PlayStation 1',
  [IGDBPlatform.PlayStation2]: 'PlayStation 2',
  [IGDBPlatform.PlayStation3]: 'PlayStation 3',
  [IGDBPlatform.PlayStation4]: 'PlayStation 4',
  [IGDBPlatform.PlayStation5]: 'PlayStation 5',
  [IGDBPlatform.Xbox]: 'Xbox',
  [IGDBPlatform.Xbox360]: 'Xbox 360',
  [IGDBPlatform.XboxOne]: 'Xbox One',
  [IGDBPlatform.XboxSeries]: 'Xbox Series',
  [IGDBPlatform.NintendoSwitch]: 'Nintendo Switch',
}

export type IGDBRawGame = {
  id: number
  name: string
  summary?: string
  first_release_date?: number
  cover?: { url: string }
  artworks?: { url: string }[]
  screenshots?: { url: string }[]
  platforms?: number[]
  genres?: { name: string }[]
}

export type Game = {
  id: number
  title: string
  description: string
  platformsAvailable: IGDBPlatform[]
  imageUrl: string // portrait
  bannerUrl?: string // paisagem principal
  gallery?: string[] // banners alternativos
  year?: number
  genres?: string[]
}

export type PaginatedResponse<T> = {
  page: number
  limit: number
  itens: T[]
}
