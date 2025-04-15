export enum Platform {
  Pc = 0,
  Xbox = 1,
  PlayStation = 2,
  NintendoSwitch = 3
}

export type Game = {
  id: number
  title: string
  description: string
  price: number
  platformsAvailable: Platform[]
  imageUrl: string
  year?: number
  category?: string
}
