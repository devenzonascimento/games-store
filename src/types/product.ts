import { Game } from './game'

export enum DiscountType {
  Percentage = 'PERCENTAGE',
  Fixed = 'FIXED',
}

export type Product = {
  id: number
  igdbId: number
  price: number
  discountValue: number
  discountType: DiscountType
}

export type ProductWithGame<GameType = Game> = {
  id: number
  price: number
  discountValue: number
  discountType: DiscountType
  game: GameType
}
