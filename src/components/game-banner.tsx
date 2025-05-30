import Link from 'next/link'
import { PlatformIcon } from './platform-icon'
import { ProductWithGame } from '@/types/product'
import { productPriceManager } from '@/helpers/product-price-manager'

type GameBannerProps = {
  product: ProductWithGame
}

export function GameBanner({ product }: GameBannerProps) {
  const { finalPrice } = productPriceManager(product)

  return (
    <div className="relative h-auto w-full aspect-video xl:aspect-[3/1] border border-zinc-600 rounded-xl overflow-hidden">
      <img
        src={product.game.bannerUrl}
        alt="game"
        className="size-full object-cover"
      />

      <Link
        href={`/store/product/${product.game.id}`}
        className="absolute inset-0 size-full p-2 flex flex-col justify-between bg-gradient-to-b from-black/50 via-black/10 to-black/60"
      >
        <div className="self-end flex gap-1">
          {product.game.platformsAvailable.map(platform => (
            <PlatformIcon
              key={platform}
              platform={platform}
              className="size-4 sm:size-5 text-white fill-white shrink-0"
            />
          ))}
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xl sm:text-2xl font-bold text-white">
            {product.game.title}
          </span>

          <div className="w-full flex gap-2 items-end">
            <p className="xl:w-6/12 line-clamp-2 xl:line-clamp-4 text-xs text-zinc-400 sm:text-sm">
              {product.game.description}
            </p>

            <span className="ml-auto p-1 bg-black/40 rounded-xl min-w-max text-white sm:text-lg font-semibold">
              {finalPrice}
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}
