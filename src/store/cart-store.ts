import { IGDBPlatform } from '@/types/game'
import { DiscountType, ProductWithGame } from '@/types/product'
import { create } from 'zustand'

type CartItem = ProductWithGame & { cartItemId: number; platform: IGDBPlatform }

type CartState = {
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void

  items: CartItem[]
  syncStore: () => void
  addItem: (product: ProductWithGame, selectedPlatform: IGDBPlatform) => void
  removeItem: (productId: number, selectedPlatform: IGDBPlatform) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  getTotalDiscount: () => number
}

export const useCartStore = create<CartState>()((set, get) => ({
  isCartOpen: false,
  openCart: () => set(state => ({ ...state, isCartOpen: true })),
  closeCart: () => set(state => ({ ...state, isCartOpen: false })),

  items: [],
  syncStore: async () => {
    const cartItems = (await fetch('/api/cart').then(res =>
      res.json(),
    )) as (Omit<CartItem, 'game'> & { igdbId: number })[]

    if (cartItems.length === 0) {
      return
    }

    const response = await fetch('/api/igdb/games/batch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ids: cartItems.map(i => i.igdbId),
      }),
    })

    const productsWithGames = (await response.json()) as ProductWithGame[]

    const items = productsWithGames.map(p => {
      const cartItem = cartItems.find(c => c.id === p.id)

      return {
        ...p,
        cartItemId: cartItem?.cartItemId ?? 0,
        platform: cartItem?.platform ?? IGDBPlatform.PC,
      }
    })

    set({ items })
  },
  addItem: async (product, selectedPlatform) => {
    const items = get().items
    const existingItem = items.find(
      i => i.id === product.id && i.platform === selectedPlatform,
    )

    if (!existingItem) {
      const { id } = (await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          platform: selectedPlatform,
        }),
      }).then(res => res.json())) as { id: number }

      if (id) {
        set({
          items: [
            ...items,
            { ...product, cartItemId: id, platform: selectedPlatform },
          ],
        })
      }
    }
  },
  removeItem: async (productId, selectedPlatform) => {
    const cartItemId = get().items.find(
      i => i.id === productId && i.platform === selectedPlatform,
    )?.cartItemId

    const success = (await fetch('/api/cart/remove', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartItemId }),
    }).then(res => res.status === 200)) as boolean

    if (!success) {
      return
    }

    const item = get().items.find(i => i.cartItemId === cartItemId)
    if (item) {
      set({
        items: get().items.filter(i => i.cartItemId !== cartItemId),
      })
    }
  },
  clearCart: async () => {
    const success = (await fetch('/api/cart/clear', {
      method: 'POST',
    }).then(res => res.status === 200)) as boolean

    if (!success) {
      return
    }

    set({ items: [] })
  },
  getTotalItems: () => get().items.length,
  getTotalPrice: () => get().items.reduce((acc, i) => acc + i.price, 0),
  getTotalDiscount: () =>
    get().items.reduce((acc, i) => {
      if (!i.discountValue) {
        return acc
      }

      if (i.discountType === DiscountType.Percentage) {
        return acc + (i.price / 100) * i.discountValue
      }

      return acc + i.discountValue
    }, 0),
}))
