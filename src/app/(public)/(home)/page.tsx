import { GameBannersCarousel } from '@/components/game-banners-carousel'
import { Logo } from '@/components/icons/logo'
import { Sidebar } from '@/components/sidebar'
import { Tag } from '@/components/tag'
import {
  CalendarIcon,
  FlameIcon,
  SearchIcon,
  SparklesIcon,
  TrophyIcon,
} from 'lucide-react'

export default function Home() {
  return (
    <div className="size-full flex flex-col bg-background text-foreground">
      <header className="flex items-center justify-between h-12">
        <Logo className="ml-2 h-auto w-40" />

        <Sidebar />
      </header>

      <main className="flex-1 bg-zinc-900">
        <section className="p-4">
          <div className="p-2 flex items-center gap-2 bg-zinc-800 border border-zinc-600 rounded-xl">
            <SearchIcon />
            <input
              type="text"
              placeholder="Buscar..."
              className="flex-1 bg-transparent text-base text-white placeholder:text-zinc-500 outline-none"
            />
          </div>
        </section>

        <section className="w-full py-2 px-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <FlameIcon className="fill-amber-500 text-red-500" />
            <h2 className="text-xl font-medium text-zinc-200">Destaques</h2>
          </div>
          <GameBannersCarousel games={mockGameBanners} />
        </section>

        <section className="w-full py-2 px-4 flex items-center gap-2 overflow-x-auto">
          <Tag title="Vencedor" Icon={TrophyIcon} isActive />
          <Tag title="Mais vendidos na semana" Icon={CalendarIcon} />
          <Tag title="Novidades" Icon={SparklesIcon} />
        </section>
      </main>
    </div>
  )
}

const mockGameBanners = [
  {
    id: 1,
    imageUrl: '/forza-horizon-5-banner.jpg',
    title: 'Forza Horizon 5: Premium Edition',
    description:
      'Your Ultimate Horizon Adventure awaits! Explore the vibrant and ever-evolving open world landscapes of Mexico with limitless, fun driving action in hundreds of the world’s greatest cars. The Premium Edition includes early access to the full game, allowing you to play four days early beginning November 5, 2021. Also included are the Welcome Pack, Car Pass, VIP Membership, and two game expansions when they become available.',
    price: 359.9,
    platformsAvaliable: [2, 1],
  },
  {
    id: 2,
    imageUrl: '/forza-horizon-5-banner.jpg',
    title: 'Forza Horizon 5: Premium Edition',
    description:
      'Your Ultimate Horizon Adventure awaits! Explore the vibrant and ever-evolving open world landscapes of Mexico with limitless, fun driving action in hundreds of the world’s greatest cars. The Premium Edition includes early access to the full game, allowing you to play four days early beginning November 5, 2021. Also included are the Welcome Pack, Car Pass, VIP Membership, and two game expansions when they become available.',
    price: 359.9,
    platformsAvaliable: [2, 1],
  },
  {
    id: 3,
    imageUrl: '/forza-horizon-5-banner.jpg',
    title: 'Forza Horizon 5: Premium Edition',
    description:
      'Your Ultimate Horizon Adventure awaits! Explore the vibrant and ever-evolving open world landscapes of Mexico with limitless, fun driving action in hundreds of the world’s greatest cars. The Premium Edition includes early access to the full game, allowing you to play four days early beginning November 5, 2021. Also included are the Welcome Pack, Car Pass, VIP Membership, and two game expansions when they become available.',
    price: 359.9,
    platformsAvaliable: [2, 1],
  },
  {
    id: 4,
    imageUrl: '/forza-horizon-5-banner.jpg',
    title: 'Forza Horizon 5: Premium Edition',
    description:
      'Your Ultimate Horizon Adventure awaits! Explore the vibrant and ever-evolving open world landscapes of Mexico with limitless, fun driving action in hundreds of the world’s greatest cars. The Premium Edition includes early access to the full game, allowing you to play four days early beginning November 5, 2021. Also included are the Welcome Pack, Car Pass, VIP Membership, and two game expansions when they become available.',
    price: 359.9,
    platformsAvaliable: [2, 1],
  },
  {
    id: 5,
    imageUrl: '/forza-horizon-5-banner.jpg',
    title: 'Forza Horizon 5: Premium Edition',
    description:
      'Your Ultimate Horizon Adventure awaits! Explore the vibrant and ever-evolving open world landscapes of Mexico with limitless, fun driving action in hundreds of the world’s greatest cars. The Premium Edition includes early access to the full game, allowing you to play four days early beginning November 5, 2021. Also included are the Welcome Pack, Car Pass, VIP Membership, and two game expansions when they become available.',
    price: 359.9,
    platformsAvaliable: [2, 1],
  },
]
