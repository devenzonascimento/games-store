// types/igdb.ts
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

// types/game.ts
export enum Platform {
  Pc = 0,
  Xbox = 1,
  PlayStation = 2,
  NintendoSwitch = 3,
}

export type Game = {
  id: number
  title: string
  description: string
  price: number
  platformsAvailable: Platform[]
  imageUrl: string // portrait
  bannerUrl?: string // paisagem principal
  gallery?: string[] // banners alternativos
  year?: number
  category?: string
}

export type GameCard = {
  id: number
  title: string
  description: string
  price: number
  imageUrl: string
}

export type GameBanner = {
  id: number
  title: string
  description: string
  price: number
  imageUrl: string
  platformsAvailable: Platform[]
}
