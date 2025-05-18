import { DiscountType, Product, ProductWithGame } from '@/types/product'
import { formatCurrency } from './format-currency'
import { formatPercentage } from './format-percentage'

export function productPriceManager(product: Product | ProductWithGame) {
  const discount =
    product.discountType === DiscountType.Percentage
      ? formatPercentage(product.discountValue)
      : formatCurrency(product.discountValue)

  const finalPrice = formatCurrency(
    product.discountType === DiscountType.Percentage
      ? product.price - product.price / 100 * product.discountValue
      : product.price - product.discountValue,
  )

  const originalPrice = formatCurrency(product.price)

  return {
    hasDiscount: !!product.discountValue,
    discount,
    originalPrice,
    finalPrice,
  }
}
