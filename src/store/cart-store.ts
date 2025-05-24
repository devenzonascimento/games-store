import { DiscountType, ProductWithGame } from '@/types/product'
import { create } from 'zustand'

type CartItem = ProductWithGame & { cartItemId: number }

type CartState = {
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void

  items: CartItem[]
  syncStore: () => void
  alreadyIntoCart: (productId: number) => boolean
  addItem: (product: ProductWithGame) => void
  removeItem: (productId: number) => void
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

    // Exemplo de uso
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
      }
    })

    set({ items })
  },
  alreadyIntoCart: productId => get().items.some(i => i.id === productId),
  addItem: async product => {
    const items = get().items
    const existingItem = items.find(i => i.id === product.id)

    if (!existingItem) {
      const { id } = (await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          platform: product.game.platformsAvailable.at(0),
        }),
      }).then(res => res.json())) as { id: number }

      if (id) {
        set({
          items: [...items, { ...product, cartItemId: id }],
        })
      }
    }
  },
  removeItem: async productId => {
    const cartItemId = get().items.find(i => i.id === productId)?.cartItemId

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
