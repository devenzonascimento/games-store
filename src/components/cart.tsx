'use client'

import { BanknoteIcon, Trash2Icon, XIcon } from 'lucide-react'
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
import { DiscountType } from '@/types/product'
import { formatPercentage } from '@/helpers/format-percentage'
import { formatCurrency } from '@/helpers/format-currency'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from './ui/toast'

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

  const { toast } = useToast()

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

        <div className="flex flex-col gap-4 overflow-y-auto no-scrollbar">
          {items.map(item => (
            <CartItem
              key={item.id}
              id={item.game.id}
              title={item.game.title}
              imageUrl={item.game.imageUrl}
              platform={item.game.platformsAvailable?.[0]}
              price={item.price}
              discount={item.discount / 100}
              discountType={item.discountType}
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
      </SheetContent>
    </Sheet>
  )
}

type CartItemProps = {
  id: number
  title: string
  imageUrl: string
  platform: IGDBPlatform
  price: number
  discount: number
  discountType: DiscountType
  onRemove: () => void
}

export function CartItem({
  title,
  imageUrl,
  platform,
  price,
  discount,
  discountType,
  onRemove,
}: CartItemProps) {
  const finalPrice =
    discountType === DiscountType.Percentage
      ? price - price * discount
      : price - discount

  return (
    <div className="w-full grid grid-cols-[auto_1fr] gap-2">
      <div className="w-20 aspect-[3/4] overflow-hidden rounded">
        <img src={imageUrl} alt={title} className="size-full object-cover" />
      </div>

      <div className="py-1 flex flex-col gap-1">
        <header className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white">{title}</h2>

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
            platform={platform}
            className="size-4 text-white fill-white shrink-0"
          />
          <span className="text-xs">{IGDBPlatform[platform]}</span>
        </div>

        <div className="mt-auto w-full flex items-center gap-2">
          <div className="h-4 px-1.5 flex items-center justify-center rounded-full bg-emerald-800">
            {discountType === DiscountType.Percentage && (
              <span className="text-xs font-medium text-white">
                {formatPercentage(-discount)}
              </span>
            )}

            {discountType === DiscountType.Value && (
              <span className="text-xs font-medium text-white">
                {formatCurrency(-discount)}
              </span>
            )}
          </div>

          <span className="line-through text-sm text-zinc-500">
            {formatCurrency(price)}
          </span>

          <span className="ml-auto text-base font-bold text-white">
            {formatCurrency(finalPrice)}
          </span>
        </div>
      </div>
    </div>
  )
}
