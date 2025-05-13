import { DiscountType } from '@prisma/client'

export const generateRandomPrice = () => {
  const priceOptions = [
    29.9, 49.9, 59.9, 79.9, 99.9, 149.9, 199.9, 249.9, 299.9,
  ]
  return priceOptions[Math.floor(Math.random() * priceOptions.length)]
}

export const generateRandomDiscount = () => {
  const shouldHaveDiscount = Math.random() < 0.35 // 35% dos produtos terão desconto

  if (!shouldHaveDiscount) return { type: null, value: null }

  const discountType: DiscountType =
    Math.random() < 0.5 ? 'PERCENTAGE' : ('FIXED' as const)

  const value =
    discountType === 'PERCENTAGE'
      ? [5, 10, 15, 20, 25, 30][Math.floor(Math.random() * 6)]
      : [5, 10, 15, 20, 25][Math.floor(Math.random() * 5)]

  return {
    type: discountType,
    value,
  }
}
