import { FlameIcon } from 'lucide-react'
import { GameBannersCarousel } from '@/components/game-banners-carousel'
import { GameCards } from '@/components/game-cards'
import { Game } from '@/types/game'

interface IGDBGame {
  id: number;
  name: string;
  summary?: string;
  cover?: { url: string };
  genres?: { name: string }[];
}

export default async function HomePage() {
  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/igdb/games?search=Zelda`,
  //   { next: { revalidate: 3600 } }
  // );

  // if (!res.ok) {
  //   console.error(`Failed to fetch games: ${res.status} ${res.statusText}`);
  //   return (
  //     <main className="w-full flex-1 bg-zinc-900 overflow-y-auto max-lg:no-scrollbar">
  //       <p className="text-red-500">Failed to load games. Please try again later.</p>
  //     </main>
  //   );
  // }

  // const games: IGDBGame[] = await res.json();

  return (
    <main className="w-full flex-1 bg-zinc-900 overflow-y-auto max-lg:no-scrollbar">
      {/* {JSON.stringify(games)} */}
      <section className="w-full py-2 px-4 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <FlameIcon className="fill-amber-500 text-red-500" />
          <h2 className="text-xl font-medium text-zinc-200">Destaques</h2>
        </div>
        <GameBannersCarousel games={mockGames} />
      </section>

      <section className="w-full py-2 px-0">
        <GameCards />
      </section>
    </main>
  )
}

const mockGames: Game[] = [
  {
    id: 1,
    imageUrl: '/gta-6-banner.webp',
    title: 'Grand Theft Auto VI',
    description:
      'Grand Theft Auto VI heads to the state of Leonida, home to the neon-soaked streets of Vice City and beyond in the biggest, most immersive evolution of the Grand Theft Auto series yet.',
    price: 359.9,
    platformsAvailable: [2, 1], // PS5, Xbox Series X|S
    year: 2025,
    category: 'Action-Adventure',
  },
  {
    id: 2,
    imageUrl: '/horizon-forbidden-west-banner.jpg',
    title: 'Horizon Forbidden West',
    description:
      'Horizon Forbidden West continues Aloy’s story as she moves west to a far-future America to brave a majestic, but dangerous frontier where she’ll face awe-inspiring machines and mysterious new threats.',
    price: 359.9,
    platformsAvailable: [2], // PS5 only
    year: 2022,
    category: 'Action RPG',
  },
  {
    id: 3,
    imageUrl: '/forza-horizon-5-banner.jpg',
    title: 'Forza Horizon 5: Premium Edition',
    description:
      'Your Ultimate Horizon Adventure awaits! Explore the vibrant and ever-evolving open world landscapes of Mexico with limitless, fun driving action in hundreds of the world’s greatest cars. The Premium Edition includes early access to the full game, allowing you to play four days early beginning November 5, 2021. Also included are the Welcome Pack, Car Pass, VIP Membership, and two game expansions when they become available.',
    price: 359.9,
    platformsAvailable: [0, 1], // PC, Xbox Series X|S
    year: 2021,
    category: 'Racing',
  },
  {
    id: 4,
    imageUrl: '/minecraft-banner.jpg',
    title: 'Minecraft',
    description: `Minecraft focuses on allowing the player to explore, interact with, and modify a dynamically-generated map made of one-cubic-meter-sized blocks. In addition to blocks, the environment features plants, mobs, and items. Some activities in the game include mining for ore, fighting hostile mobs, and crafting new blocks and tools by gathering various resources found in the game. The game's open-ended model allows players to create structures, creations, and artwork on various multiplayer servers or their single-player maps. Other features include redstone circuits for logic computations and remote actions, minecarts and tracks, and a mysterious underworld called the Nether. A designated but completely optional goal of the game is to travel to a dimension called the End, and defeat the ender dragon.`,
    price: 359.9,
    platformsAvailable: [0, 1, 2, 3], // PC, Xbox Series X|S, PS5, Nintendo Switch
    year: 2011,
    category: 'Sandbox',
  },
  {
    id: 5,
    imageUrl: '/the_legend_of_zelda_breath_of_the_wild_banner.jpg',
    title: 'The Legend of Zelda: Breath of the Wild',
    description:
      'In this 3D open-world entry in the Zelda series, Link is awakened from a deep slumber without his past memories in the post-apocalyptic Kingdom of Hyrule, and sets off on a journey to defeat the ancient evil Calamity Ganon. Link treks, climbs and glides through fields, forests and mountain ranges while meeting and helping friendly folk and defeating enemies in order to gather up the strength to face Ganon.',
    price: 359.9,
    platformsAvailable: [3], // Nintendo Switch only
    year: 2017,
    category: 'Action-Adventure',
  },
]
