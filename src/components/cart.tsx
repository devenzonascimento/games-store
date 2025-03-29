'use client'

import { BanknoteIcon, XIcon } from 'lucide-react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { Platform } from '@/types/game'
import { PlatformIcon } from './platform-icon'

export function Cart({ children }: { children: React.ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent className="w-[350px] sm:w-[540px] py-4 px-4 flex flex-col gap-6">
        <SheetHeader className="w-full flex flex-row items-center justify-between">
          <SheetTitle className="text-xl font-bold text-white">
            Your game cart
          </SheetTitle>

          <SheetClose>
            <XIcon className="size-6 text-white shrink-0" />
          </SheetClose>
        </SheetHeader>

        <div className="flex flex-col gap-4 overflow-y-auto no-scrollbar">
          <CartItem
            id={1}
            title="Grand Theft Auto VI"
            imageUrl="/gta-6.png"
            platform={Platform.PlayStation}
            price={569.9}
            discount={0.5}
            onRemove={() => {}}
          />
        </div>

        <ul className="w-full flex flex-col gap-2">
          <li className="px-2 w-full flex items-center justify-between">
            <span className="text-base text-zinc-300">Cart total</span>
            <span className="text-base font-bold text-zinc-200">R$ 569,90</span>
          </li>
          <li className="px-2 w-full flex items-center justify-between">
            <span className="text-base text-zinc-300">Tax</span>
            <span className="text-base font-bold text-zinc-200">R$ 569,90</span>
          </li>
          <li className="px-2 w-full flex items-center justify-between">
            <span className="text-base text-zinc-300">Discount total</span>
            <span className="text-base font-bold text-zinc-200">
              - R$ 569,90
            </span>
          </li>

          <div className="w-full h-[1px] bg-zinc-500" />

          <li className="px-2 w-full flex items-center justify-between">
            <span className="text-base text-zinc-300">Subtotal</span>
            <span className="text-lg font-bold text-white">R$ 2400,00</span>
          </li>
        </ul>

        <button
          type="button"
          className="w-full p-2 flex items-center justify-center gap-2 text-lg font-medium text-zinc-950 bg-white rounded-lg"
        >
          <BanknoteIcon className="size-6 shrink-0" />
          Procced to checkout
        </button>
      </SheetContent>
    </Sheet>
  )
}

const mock = {
  id: 1,
  imageUrl: '/gta-6.png',
  title: 'Grand Theft Auto VI',
  description:
    'Grand Theft Auto VI heads to the state of Leonida, home to the neon-soaked streets of Vice City and beyond in the biggest, most immersive evolution of the Grand Theft Auto series yet.',
  price: 359.9,
  platformsAvailable: [2, 1],
  year: 2025,
  category: 'Shooter',
  tags: ['Open World', 'Action', 'Adventure'],
}

type CartItemProps = {
  id: number
  title: string
  imageUrl: string
  platform: Platform
  price: number
  discount: number
  onRemove: () => void
}

export function CartItem({
  title,
  imageUrl,
  platform,
  price,
  discount,
  onRemove,
}: CartItemProps) {
  return (
    <div className="w-full grid grid-cols-[auto_1fr] gap-2" onClick={onRemove}>
      <div className="w-20 aspect-[3/4] overflow-hidden rounded">
        <img src={imageUrl} alt={title} className="size-full object-cover" />
      </div>

      <div className="py-1 flex flex-col gap-1">
        <header className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white">{title}</h2>

          <button
            type="button"
            className="p-0.5 flex items-center justify-center bg-rose-500 rounded"
          >
            <XIcon className="size-5 text-white shrink-0" />
          </button>
        </header>

        <div className="flex items-center gap-1">
          <PlatformIcon
            platform={platform}
            className="size-4 text-white fill-white shrink-0"
          />
          <span className="text-xs">{Platform[platform]}</span>
        </div>

        <div className="mt-auto w-full flex items-center gap-2">
          <div className="h-4 px-1.5 flex items-center justify-center rounded-full bg-emerald-800">
            <span className="text-xs font-medium text-white">
              {Intl.NumberFormat('pt-BR', {
                style: 'percent',
                currency: 'BRL',
                maximumFractionDigits: 2,
              }).format(-discount)}
            </span>
          </div>

          <span className="line-through text-sm text-zinc-500">
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              maximumFractionDigits: 2,
            }).format(price)}
          </span>

          <span className="ml-auto text-base font-bold text-white">
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              maximumFractionDigits: 2,
            }).format(price - price * discount)}
          </span>
        </div>
      </div>
    </div>
  )
}
