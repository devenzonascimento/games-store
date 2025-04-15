import { FlameIcon } from 'lucide-react'
import { GameBannersCarousel } from '@/components/game-banners-carousel'
import { GameCards } from '@/components/game-cards'

export default function HomePage() {
  return (
    <main className="w-full flex-1 bg-zinc-900 overflow-y-auto max-lg:no-scrollbar">
      <section className="w-full py-2 px-4 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <FlameIcon className="fill-amber-500 text-red-500" />
          <h2 className="text-xl font-medium text-zinc-200">Destaques</h2>
        </div>
        <GameBannersCarousel games={mockGameBanners} />
      </section>

      <section className="w-full py-2 px-0">
        <GameCards />
      </section>
    </main>
  )
}

const mockGameBanners = [
  {
    id: 1,
    imageUrl: '/forza-horizon-5-banner.png',
    title: 'Forza Horizon 5: Premium Edition',
    description:
      'Your Ultimate Horizon Adventure awaits! Explore the vibrant and ever-evolving open world landscapes of Mexico with limitless, fun driving action in hundreds of the world’s greatest cars. The Premium Edition includes early access to the full game, allowing you to play four days early beginning November 5, 2021. Also included are the Welcome Pack, Car Pass, VIP Membership, and two game expansions when they become available.',
    price: 359.9,
    platformsAvailable: [2, 1],
    year: 2021,
    category: 'Racing',
  },
  {
    id: 2,
    imageUrl: '/forza-horizon-5-banner.png',
    title: 'Forza Horizon 5: Premium Edition',
    description:
      'Your Ultimate Horizon Adventure awaits! Explore the vibrant and ever-evolving open world landscapes of Mexico with limitless, fun driving action in hundreds of the world’s greatest cars. The Premium Edition includes early access to the full game, allowing you to play four days early beginning November 5, 2021. Also included are the Welcome Pack, Car Pass, VIP Membership, and two game expansions when they become available.',
    price: 359.9,
    platformsAvailable: [2, 1],
    year: 2021,
    category: 'Racing',
  },
  {
    id: 3,
    imageUrl: '/forza-horizon-5-banner.png',
    title: 'Forza Horizon 5: Premium Edition',
    description:
      'Your Ultimate Horizon Adventure awaits! Explore the vibrant and ever-evolving open world landscapes of Mexico with limitless, fun driving action in hundreds of the world’s greatest cars. The Premium Edition includes early access to the full game, allowing you to play four days early beginning November 5, 2021. Also included are the Welcome Pack, Car Pass, VIP Membership, and two game expansions when they become available.',
    price: 359.9,
    platformsAvailable: [2, 1],
    year: 2021,
    category: 'Racing',
  },
  {
    id: 4,
    imageUrl: '/forza-horizon-5-banner.png',
    title: 'Forza Horizon 5: Premium Edition',
    description:
      'Your Ultimate Horizon Adventure awaits! Explore the vibrant and ever-evolving open world landscapes of Mexico with limitless, fun driving action in hundreds of the world’s greatest cars. The Premium Edition includes early access to the full game, allowing you to play four days early beginning November 5, 2021. Also included are the Welcome Pack, Car Pass, VIP Membership, and two game expansions when they become available.',
    price: 359.9,
    platformsAvailable: [2, 1],
    year: 2021,
    category: 'Racing',
  },
  {
    id: 5,
    imageUrl: '/forza-horizon-5-banner.png',
    title: 'Forza Horizon 5: Premium Edition',
    description:
      'Your Ultimate Horizon Adventure awaits! Explore the vibrant and ever-evolving open world landscapes of Mexico with limitless, fun driving action in hundreds of the world’s greatest cars. The Premium Edition includes early access to the full game, allowing you to play four days early beginning November 5, 2021. Also included are the Welcome Pack, Car Pass, VIP Membership, and two game expansions when they become available.',
    price: 359.9,
    platformsAvailable: [2, 1],
    year: 2021,
    category: 'Racing',
  },
]
