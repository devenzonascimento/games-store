export enum Platform {
  Pc = 0,
  PlayStation = 1,
  Xbox = 2,
}

export type Game = {
  id: number
  title: string
  description: string
  price: number
  platformsAvailable: Platform[]
  imageUrl: string
}
