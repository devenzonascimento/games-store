import { useQueryClient } from '@tanstack/react-query'
import { ProductWithGame } from '@/types/product'

export const usePopulateProductsCache = () => {
  const queryClient = useQueryClient()

  const populateCache = (products: ProductWithGame[]) => {
    for (const product of products) {
      queryClient.setQueryData(
        ['game', `${product.game.id}`],
        (oldData: ProductWithGame | undefined) => {
          if (oldData) {
            return oldData
          }
          
          return product
        },
      )
    }
  }

  return { populateCache }
}
