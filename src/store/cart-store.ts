import { DiscountType, ProductWithGame } from '@/types/product'
import { create } from 'zustand'

type CartState = {
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void

  items: ProductWithGame[]
  addItem: (product: ProductWithGame) => void
  removeItem: (id: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  getTotalDiscount: () => number
}

export const useCartStore = create<CartState>((set, get) => ({
  isCartOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),

  items: [],
  addItem: product => {
    const items = get().items
    const existingItem = items.find(i => i.id === product.id)

    if (!existingItem) {
      set({
        items: [...items, product],
      })
    }
  },
  removeItem: id => {
    const item = get().items.find(i => i.id === id)
    if (item) {
      set({
        items: get().items.filter(i => i.id !== id),
      })
    }
  },
  clearCart: () => set({ items: [] }),
  getTotalItems: () => get().items.length,
  getTotalPrice: () => get().items.reduce((acc, i) => acc + i.price, 0),
  getTotalDiscount: () =>
    get().items.reduce((acc, i) => {
      if (i.discountType === DiscountType.Percentage) {
        return acc + (i.price * i.discount) / 100
      }

      return acc + i.price
    }, 0),
}))
