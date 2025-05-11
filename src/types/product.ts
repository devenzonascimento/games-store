import { GameCartItem } from './game'

export enum DiscountType {
  Percentage = 0,
  Value = 1,
}

export type Product = {
  id: number
  gameId: number
  price: number
  discount: number
  discountType: DiscountType
}

export type ProductWithGame = {
  id: number
  price: number
  discount: number
  discountType: DiscountType
  game: GameCartItem
}
