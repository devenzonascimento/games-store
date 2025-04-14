'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SearchIcon } from 'lucide-react'
import { PlatformIcon } from '@/components/platform-icon'

export default function Catalog() {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState('')

  return (
    <main className="w-full flex-1 flex flex-col bg-zinc-900 overflow-hidden">
      <section className="w-full p-4">
        <div className="p-2 flex items-center gap-2 bg-zinc-800 border border-zinc-600 rounded-xl">
          <SearchIcon />
          <input
            type="text"
            placeholder="Buscar..."
            className="flex-1 bg-transparent text-base text-white placeholder:text-zinc-500 outline-none"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          />
        </div>
      </section>

      <section className="flex flex-col gap-3 p-4 overflow-y-auto max-lg:no-scrollbar">
        {mockGames
          .filter(g => (searchValue ? g.title.includes(searchValue) : true))
          .map(game => {
            return (
              <div
                key={game.id}
                className="min-h-max grid grid-cols-[auto_1fr] bg-zinc-800 rounded-md shadow-lg shadow-black"
                onClick={() => router.push(`/product/${game.id}`)}
              >
                <div className="h-24 aspect-[3/4] overflow-hidden rounded">
                  <img
                    src={game.imageUrl}
                    alt={game.title}
                    className="size-full object-cover"
                  />
                </div>

                <div className="py-1 px-2 flex flex-col">
                  <span className="text-base font-bold text-white">
                    {game.title}
                  </span>

                  <span className="text-sm font-medium text-zinc-300">
                    {game.year} - {game.category}
                  </span>

                  <div className="mt-auto flex justify-between items-end gap-2">
                    <div className="self-end flex gap-1">
                      {game.platformsAvailable.map(platform => (
                        <PlatformIcon
                          key={platform}
                          platform={platform}
                          className="size-4 text-white fill-white shrink-0"
                        />
                      ))}
                    </div>

                    <span className="min-w-max text-sm text-white font-semibold">
                      {Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                        maximumFractionDigits: 2,
                      }).format(game.price)}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
      </section>
    </main>
  )
}

export const mockGames = [
  {
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
  },
  {
    id: 2,
    imageUrl: '/horizon-forbidden-west.png',
    title: 'Horizon Forbidden West',
    description:
      'Horizon Forbidden West continues Aloy’s story as she moves west to a far-future America to brave a majestic, but dangerous frontier where she’ll face awe-inspiring machines and mysterious new threats.',
    price: 359.9,
    platformsAvailable: [2, 1],
    year: 2025,
    category: 'Shooter',
    tags: ['Open World', 'Action', 'Adventure'],
  },
  {
    id: 3,
    imageUrl: '/forza-horizon-5.png',
    title: 'Forza Horizon 5: Premium Edition',
    description:
      'Your Ultimate Horizon Adventure awaits! Explore the vibrant and ever-evolving open world landscapes of Mexico with limitless, fun driving action in hundreds of the world’s greatest cars. The Premium Edition includes early access to the full game, allowing you to play four days early beginning November 5, 2021. Also included are the Welcome Pack, Car Pass, VIP Membership, and two game expansions when they become available.',
    price: 359.9,
    platformsAvailable: [0, 2, 1],
    year: 2025,
    category: 'Shooter',
    tags: ['Open World', 'Action', 'Adventure'],
  },
  {
    id: 4,
    imageUrl: '/minecraft.png',
    title: 'Minecraft',
    description: `Minecraft focuses on allowing the player to explore, interact with, and modify a dynamically-generated map made of one-cubic-meter-sized blocks. In addition to blocks, the environment features plants, mobs, and items. Some activities in the game include mining for ore, fighting hostile mobs, and crafting new blocks and tools by gathering various resources found in the game. The game's open-ended model allows players to create structures, creations, and artwork on various multiplayer servers or their single-player maps. Other features include redstone circuits for logic computations and remote actions, minecarts and tracks, and a mysterious underworld called the Nether. A designated but completely optional goal of the game is to travel to a dimension called the End, and defeat the ender dragon.`,
    price: 359.9,
    platformsAvailable: [2, 1],
    year: 2025,
    category: 'Shooter',
    tags: ['Open World', 'Action', 'Adventure'],
  },
  {
    id: 5,
    imageUrl: '/zelda-breath-of-the-wild.png',
    title: 'The Legend of Zelda: Breath of the Wild',
    description:
      'In this 3D open-world entry in the Zelda series, Link is awakened from a deep slumber without his past memories in the post-apocalyptic Kingdom of Hyrule, and sets off on a journey to defeat the ancient evil Calamity Ganon. Link treks, climbs and glides through fields, forests and mountain ranges while meeting and helping friendly folk and defeating enemies in order to gather up the strength to face Ganon.',
    price: 359.9,
    platformsAvailable: [2, 1],
    year: 2025,
    category: 'Shooter',
    tags: ['Open World', 'Action', 'Adventure'],
  },
]
