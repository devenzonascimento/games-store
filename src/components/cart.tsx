'use client'

import { BanknoteIcon, ShoppingCartIcon, Trash2Icon, XIcon } from 'lucide-react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from './ui/sheet'
import { IGDBPlatform } from '@/types/game'
import { PlatformIcon } from './platform-icon'
import { useCartStore } from '@/store/cart-store'
import { ProductWithGame } from '@/types/product'
import { formatCurrency } from '@/helpers/format-currency'
import { productPriceManager } from '@/helpers/product-price-manager'

export function Cart() {
  const {
    items,
    removeItem,
    clearCart,
    getTotalPrice,
    getTotalDiscount,
    isCartOpen,
    closeCart,
  } = useCartStore()

  return (
    <Sheet open={isCartOpen} onOpenChange={closeCart}>
      <SheetContent className="w-[350px] sm:w-[540px] py-4 px-4 flex flex-col gap-6">
        <SheetHeader className="w-full flex flex-row items-center justify-between">
          <SheetTitle className="text-xl font-bold text-white">
            Your game cart
          </SheetTitle>

          <SheetClose type="button" className="!m-0" onClick={closeCart}>
            <XIcon className="size-6 text-white shrink-0" />
          </SheetClose>
        </SheetHeader>

        {items.length > 0 && (
          <>
            <div className="flex flex-col gap-4 overflow-y-auto no-scrollbar">
              {items.map(item => (
                <CartItem
                  key={item.cartItemId}
                  product={item as ProductWithGame}
                  onRemove={() => removeItem(item.id)}
                />
              ))}
            </div>

            <ul className="w-full flex flex-col gap-2">
              <li className="px-2 w-full flex items-center justify-between">
                <span className="text-base text-zinc-300">Cart total</span>
                <span className="text-base font-bold text-zinc-200">
                  {formatCurrency(getTotalPrice())}
                </span>
              </li>

              <li className="px-2 w-full flex items-center justify-between">
                <span className="text-base text-zinc-300">Discount total</span>
                <span className="text-base font-bold text-zinc-200">
                  {formatCurrency(-getTotalDiscount())}
                </span>
              </li>

              <div className="w-full h-[1px] bg-zinc-500" />

              <li className="px-2 w-full flex items-center justify-between">
                <span className="text-base text-zinc-300">Subtotal</span>
                <span className="text-lg font-bold text-white">
                  {formatCurrency(getTotalPrice() - getTotalDiscount())}
                </span>
              </li>
            </ul>

            <button
              type="button"
              className="w-full p-2 flex items-center justify-center gap-2 text-lg font-medium text-white bg-transparent border border-white rounded-lg hover:opacity-70"
              onClick={clearCart}
            >
              <Trash2Icon className="size-6 shrink-0" />
              Clear cart
            </button>

            <button
              type="button"
              className="w-full p-2 flex items-center justify-center gap-2 text-lg font-medium text-zinc-950 bg-white rounded-lg hover:opacity-70"
            >
              <BanknoteIcon className="size-6 shrink-0" />
              Procced to checkout
            </button>
          </>
        )}

        {items.length === 0 && (
          <div className="py-10 flex flex-col items-center justify-center gap-4 text-center text-zinc-400">
            <ShoppingCartIcon className="text-zinc-500 size-24" />
            <p className="text-lg">Your cart is empty</p>
            <p className="text-sm">Add some games to start shopping!</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

type CartItemProps = {
  product: ProductWithGame
  onRemove: () => void
}

export function CartItem({ product, onRemove }: CartItemProps) {
  const { hasDiscount, discount, originalPrice, finalPrice } =
    productPriceManager(product)

  return (
    <div className="w-full grid grid-cols-[auto_1fr] gap-2">
      <div className="w-20 aspect-[3/4] overflow-hidden rounded">
        <img
          src={product.game.imageUrl}
          alt={product.game.title}
          className="size-full object-cover"
        />
      </div>

      <div className="py-1 flex flex-col gap-1">
        <header className="flex items-start justify-between">
          <h2 className="text-base font-bold text-white">
            {product.game.title}
          </h2>

          <button
            type="button"
            className="p-0.5 flex items-center justify-center bg-rose-500 rounded"
            onClick={onRemove}
          >
            <XIcon className="size-5 text-white shrink-0" />
          </button>
        </header>

        <div className="flex items-center gap-1">
          <PlatformIcon
            platform={product.game.platformsAvailable?.[0]}
            className="size-4 text-white fill-white shrink-0"
          />
          <span className="text-xs">
            {IGDBPlatform[product.game.platformsAvailable?.[0]]}
          </span>
        </div>

        <div className="mt-auto w-full flex items-center gap-2">
          {hasDiscount && (
            <>
              <div className="h-4 px-1.5 flex items-center justify-center rounded-full bg-emerald-800">
                <span className="text-xs font-medium text-white">
                  {discount}
                </span>
              </div>

              <span className="mr-auto line-through text-sm text-zinc-500">
                {originalPrice}
              </span>
            </>
          )}

          <span className="ml-auto min-w-max text-sm sm:text-base text-white font-semibold">
            {finalPrice}
          </span>
        </div>
      </div>
    </div>
  )
}
