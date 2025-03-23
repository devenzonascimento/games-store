import { FlameIcon } from 'lucide-react'
import { GameBannersCarousel } from '@/components/game-banners-carousel'
import { GameVerticalCard } from '@/components/game-vertical-card'
import { TopicsFilterTags } from '@/components/topics-filter-tags'

export default function HomePage() {
  return (
    <main className="mb-16 flex-1 bg-zinc-900">
      {/* <section className="p-4">
          <div className="p-2 flex items-center gap-2 bg-zinc-800 border border-zinc-600 rounded-xl">
            <SearchIcon />
            <input
              type="text"
              placeholder="Buscar..."
              className="flex-1 bg-transparent text-base text-white placeholder:text-zinc-500 outline-none"
            />
          </div>
        </section> */}

      <section className="w-full py-2 px-4 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <FlameIcon className="fill-amber-500 text-red-500" />
          <h2 className="text-xl font-medium text-zinc-200">Destaques</h2>
        </div>
        <GameBannersCarousel games={mockGameBanners} />
      </section>

      <section className="w-full py-2 px-0">
        <TopicsFilterTags />
      </section>

      <section className="w-full py-2 px-4 grid grid-cols-2 gap-4">
        {mockGameCards.map(game => (
          <GameVerticalCard key={game.id} game={game} />
        ))}
      </section>
    </main>
  )
}

export const mockGameBanners = [
  {
    id: 1,
    imageUrl: '/forza-horizon-5-banner.png',
    title: 'Forza Horizon 5: Premium Edition',
    description:
      'Your Ultimate Horizon Adventure awaits! Explore the vibrant and ever-evolving open world landscapes of Mexico with limitless, fun driving action in hundreds of the world’s greatest cars. The Premium Edition includes early access to the full game, allowing you to play four days early beginning November 5, 2021. Also included are the Welcome Pack, Car Pass, VIP Membership, and two game expansions when they become available.',
    price: 359.9,
    platformsAvaliable: [2, 1],
  },
  {
    id: 2,
    imageUrl: '/forza-horizon-5-banner.png',
    title: 'Forza Horizon 5: Premium Edition',
    description:
      'Your Ultimate Horizon Adventure awaits! Explore the vibrant and ever-evolving open world landscapes of Mexico with limitless, fun driving action in hundreds of the world’s greatest cars. The Premium Edition includes early access to the full game, allowing you to play four days early beginning November 5, 2021. Also included are the Welcome Pack, Car Pass, VIP Membership, and two game expansions when they become available.',
    price: 359.9,
    platformsAvaliable: [2, 1],
  },
  {
    id: 3,
    imageUrl: '/forza-horizon-5-banner.png',
    title: 'Forza Horizon 5: Premium Edition',
    description:
      'Your Ultimate Horizon Adventure awaits! Explore the vibrant and ever-evolving open world landscapes of Mexico with limitless, fun driving action in hundreds of the world’s greatest cars. The Premium Edition includes early access to the full game, allowing you to play four days early beginning November 5, 2021. Also included are the Welcome Pack, Car Pass, VIP Membership, and two game expansions when they become available.',
    price: 359.9,
    platformsAvaliable: [2, 1],
  },
  {
    id: 4,
    imageUrl: '/forza-horizon-5-banner.png',
    title: 'Forza Horizon 5: Premium Edition',
    description:
      'Your Ultimate Horizon Adventure awaits! Explore the vibrant and ever-evolving open world landscapes of Mexico with limitless, fun driving action in hundreds of the world’s greatest cars. The Premium Edition includes early access to the full game, allowing you to play four days early beginning November 5, 2021. Also included are the Welcome Pack, Car Pass, VIP Membership, and two game expansions when they become available.',
    price: 359.9,
    platformsAvaliable: [2, 1],
  },
  {
    id: 5,
    imageUrl: '/forza-horizon-5-banner.png',
    title: 'Forza Horizon 5: Premium Edition',
    description:
      'Your Ultimate Horizon Adventure awaits! Explore the vibrant and ever-evolving open world landscapes of Mexico with limitless, fun driving action in hundreds of the world’s greatest cars. The Premium Edition includes early access to the full game, allowing you to play four days early beginning November 5, 2021. Also included are the Welcome Pack, Car Pass, VIP Membership, and two game expansions when they become available.',
    price: 359.9,
    platformsAvaliable: [2, 1],
  },
]

export const mockGameCards = [
  {
    id: 1,
    imageUrl: '/gta-6.png',
    title: 'Grand Theft Auto VI',
    description:
      'Grand Theft Auto VI heads to the state of Leonida, home to the neon-soaked streets of Vice City and beyond in the biggest, most immersive evolution of the Grand Theft Auto series yet.',
    price: 359.9,
    platformsAvaliable: [2, 1],
  },
  {
    id: 2,
    imageUrl: '/horizon-forbidden-west.png',
    title: 'Horizon Forbidden West',
    description:
      'Horizon Forbidden West continues Aloy’s story as she moves west to a far-future America to brave a majestic, but dangerous frontier where she’ll face awe-inspiring machines and mysterious new threats.',
    price: 359.9,
    platformsAvaliable: [2, 1],
  },
  {
    id: 3,
    imageUrl: '/forza-horizon-5.png',
    title: 'Forza Horizon 5: Premium Edition',
    description:
      'Your Ultimate Horizon Adventure awaits! Explore the vibrant and ever-evolving open world landscapes of Mexico with limitless, fun driving action in hundreds of the world’s greatest cars. The Premium Edition includes early access to the full game, allowing you to play four days early beginning November 5, 2021. Also included are the Welcome Pack, Car Pass, VIP Membership, and two game expansions when they become available.',
    price: 359.9,
    platformsAvaliable: [2, 1],
  },
  {
    id: 4,
    imageUrl: '/minecraft.png',
    title: 'Minecraft',
    description: `Minecraft focuses on allowing the player to explore, interact with, and modify a dynamically-generated map made of one-cubic-meter-sized blocks. In addition to blocks, the environment features plants, mobs, and items. Some activities in the game include mining for ore, fighting hostile mobs, and crafting new blocks and tools by gathering various resources found in the game. The game's open-ended model allows players to create structures, creations, and artwork on various multiplayer servers or their single-player maps. Other features include redstone circuits for logic computations and remote actions, minecarts and tracks, and a mysterious underworld called the Nether. A designated but completely optional goal of the game is to travel to a dimension called the End, and defeat the ender dragon.`,
    price: 359.9,
    platformsAvaliable: [2, 1],
  },
  {
    id: 5,
    imageUrl: '/zelda-breath-of-the-wild.png',
    title: 'The Legend of Zelda: Breath of the Wild',
    description:
      'In this 3D open-world entry in the Zelda series, Link is awakened from a deep slumber without his past memories in the post-apocalyptic Kingdom of Hyrule, and sets off on a journey to defeat the ancient evil Calamity Ganon. Link treks, climbs and glides through fields, forests and mountain ranges while meeting and helping friendly folk and defeating enemies in order to gather up the strength to face Ganon.',
    price: 359.9,
    platformsAvaliable: [2, 1],
  },
]
