import { FlameIcon } from 'lucide-react'
import { GameBannersCarousel } from '@/components/game-banners-carousel'
import { GameCards } from '@/components/game-cards'

export default async function HomePage() {
  return (
    <main className="w-full flex-1 flex flex-col items-center bg-zinc-900 overflow-y-auto max-lg:no-scrollbar">
      <section className="w-full max-w-[1240px] py-2 px-4 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <FlameIcon className="fill-amber-500 text-red-500" />
          <h2 className="text-xl font-medium text-zinc-200">Trending games</h2>
        </div>
        <GameBannersCarousel />
      </section>

      <section className="w-full max-w-[1240px] py-2 px-0">
        <GameCards />
      </section>
    </main>
  )
}
