import { PlatformIcon } from '@/components/platform-icon'
import { Game } from '@/types/game'
import {
  Gamepad2Icon,
  ShoppingCartIcon,
  StarHalfIcon,
  StarIcon,
} from 'lucide-react'

// export async function generateStaticParams() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/game`)

//   const games = (await res.json()) as Game[]

//   return games.map(({ id }) => ({ id: id.toString() }))
// }

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/game/${id}`
  const res = await fetch(apiUrl)
  const game = (await res.json()) as Game

  return (
    <main className="flex-1 flex flex-col items-center justify-start gap-6 py-6 px-4 bg-zinc-900 overflow-y-auto">
      <div className="flex-1 flex flex-col items-center justify-start gap-6 md:max-w-[768px]">
        <div className="min-h-[280px] aspect-[3/4] overflow-hidden rounded-xl">
          <img
            src={game.imageUrl}
            alt={game.title}
            className="size-full object-cover"
          />
        </div>

        <div className="flex flex-col items-center gap-4">
          <h1 className="text-center text-2xl font-bold text-white">
            {game.title}
          </h1>
          <div className="flex items-center gap-2">
            <StarIcon className="size-6 fill-white stroke-1 shrink-0" />
            <StarIcon className="size-6 fill-white stroke-1 shrink-0" />
            <StarIcon className="size-6 fill-white stroke-1 shrink-0" />
            <StarIcon className="size-6 fill-white stroke-1 shrink-0" />
            <StarHalfIcon className="size-6 fill-white stroke-1 shrink-0" />
            <span className="text-base font-semibold italic text-white">
              4,5
            </span>
          </div>
        </div>

        <div className="w-full flex items-center justify-center gap-4 px-4">
          <div className="h-6 px-2 pt-0.5 flex items-center justify-center rounded-full bg-emerald-800">
            <span className="text-base font-medium text-white">-50%</span>
          </div>

          <span className="line-through text-xl text-zinc-500">
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              maximumFractionDigits: 2,
            }).format(game.price)}
          </span>

          <span className="text-xl font-bold text-white">
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              maximumFractionDigits: 2,
            }).format(game.price / 2)}
          </span>
        </div>

        <div className="w-full flex flex-col items-center gap-4">
          <button
            type="button"
            className="w-full p-2 flex items-center justify-center gap-2 text-lg font-medium text-white bg-emerald-800 rounded-lg hover:opacity-70"
          >
            <Gamepad2Icon className="size-6 text-white shrink-0" />
            Buy now
          </button>
          <button
            type="button"
            className="w-full p-2 flex items-center justify-center gap-2 text-lg font-medium text-zinc-950 bg-white rounded-lg hover:opacity-70"
          >
            <ShoppingCartIcon className="size-6 shrink-0" />
            Add to cart
          </button>
        </div>

        <section className="w-full flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-white">
            Available platforms
          </h2>

          <div className="ml-1 flex items-center gap-2">
            {game.platformsAvailable.map(platform => (
              <PlatformIcon
                key={platform}
                platform={platform}
                className="size-6 fill-white shrink-0"
              />
            ))}
          </div>
        </section>

        <section className="w-full flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-white">Genres</h2>

          <div className="ml-1 px-2 py-1 text-sm font-medium text-white border border-zinc-600 rounded-md max-w-min">
            {game.category}
          </div>
          {/* // TODO: Colocar lista de tags */}
        </section>

        <section className="w-full flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-white">Description</h2>

          <p className="ml-1 text-base text-zinc-300">{game.description}</p>
        </section>
      </div>
    </main>
  )
}
