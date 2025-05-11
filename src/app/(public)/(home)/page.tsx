import { FlameIcon } from 'lucide-react'
import { GameBannersCarousel } from '@/components/game-banners-carousel'
import { GameCards } from '@/components/game-cards'
import { GameBanner, IGDBPlatform } from '@/types/game'

// TODO: Pensar na posibilidade de gerar um script para mockar muitos dados deles, ao invés de usar a api, pensando em performance e disponibilidade para o dia da apresentação

// TODO: Integrar um endpoint de mock para pegar os principais jogos para o banner da home

// TODO: Pensar na integração com o banco de dados principal para conectar jogos em produtos e vendas

// TODO: Reimaginar a pagina e colocar mais features como carrinho de compras, toasts, checkout, busca e filtragem complexa etc,

export default async function HomePage() {
  return (
    <main className="w-full flex-1 flex flex-col items-center bg-zinc-900 overflow-y-auto max-lg:no-scrollbar">
      <section className="w-full max-w-[1240px] py-2 px-4 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <FlameIcon className="fill-amber-500 text-red-500" />
          <h2 className="text-xl font-medium text-zinc-200">Destaques</h2>
        </div>
        <GameBannersCarousel games={mockGames} />
      </section>

      <section className="w-full max-w-[1240px] py-2 px-0">
        <GameCards />
      </section>
    </main>
  )
}

const mockGames: GameBanner[] = [
  {
    id: 1,
    // imageUrl: '//images.igdb.com/igdb/image/upload/t_1080p/ar3ksl.jpg',
    imageUrl: '//images.igdb.com/igdb/image/upload/t_1080p/ar3ksm.jpg',
    // imageUrl: '//images.igdb.com/igdb/image/upload/t_1080p/scwpqj.jpg',
    // imageUrl: '//images.igdb.com/igdb/image/upload/t_1080p/scwpqi.jpg',
    // imageUrl: '//images.igdb.com/igdb/image/upload/t_1080p/scpsp7.jpg',
    // imageUrl: '//images.igdb.com/igdb/image/upload/t_1080p/scpsp6.jpg',
    // imageUrl: '//images.igdb.com/igdb/image/upload/t_1080p/scpsp8.jpg',
    // imageUrl: '//images.igdb.com/igdb/image/upload/t_1080p/scpsp9.jpg',
    // imageUrl: '//images.igdb.com/igdb/image/upload/t_1080p/sct9wv.jpg',
    title: 'Grand Theft Auto VI',
    description:
      'Grand Theft Auto VI heads to the state of Leonida, home to the neon-soaked streets of Vice City and beyond in the biggest, most immersive evolution of the Grand Theft Auto series yet.',
    price: 359.9,
    platformsAvailable: [IGDBPlatform.PlayStation5, IGDBPlatform.XboxSeries],
  },
  {
    id: 2,
    imageUrl: '/horizon-forbidden-west-banner.jpg',
    title: 'Horizon Forbidden West',
    description:
      'Horizon Forbidden West continues Aloy’s story as she moves west to a far-future America to brave a majestic, but dangerous frontier where she’ll face awe-inspiring machines and mysterious new threats.',
    price: 359.9,
    platformsAvailable: [IGDBPlatform.PlayStation5], // PS5 only
  },
  {
    id: 3,
    imageUrl: '/forza-horizon-5-banner.jpg',
    title: 'Forza Horizon 5: Premium Edition',
    description:
      'Your Ultimate Horizon Adventure awaits! Explore the vibrant and ever-evolving open world landscapes of Mexico with limitless, fun driving action in hundreds of the world’s greatest cars. The Premium Edition includes early access to the full game, allowing you to play four days early beginning November 5, 2021. Also included are the Welcome Pack, Car Pass, VIP Membership, and two game expansions when they become available.',
    price: 359.9,
    platformsAvailable: [
      IGDBPlatform.PC,
      IGDBPlatform.PlayStation5,
      IGDBPlatform.XboxSeries,
    ],
  },
  {
    id: 4,
    imageUrl: '/minecraft-banner.jpg',
    title: 'Minecraft',
    description: `Minecraft focuses on allowing the player to explore, interact with, and modify a dynamically-generated map made of one-cubic-meter-sized blocks. In addition to blocks, the environment features plants, mobs, and items. Some activities in the game include mining for ore, fighting hostile mobs, and crafting new blocks and tools by gathering various resources found in the game. The game's open-ended model allows players to create structures, creations, and artwork on various multiplayer servers or their single-player maps. Other features include redstone circuits for logic computations and remote actions, minecarts and tracks, and a mysterious underworld called the Nether. A designated but completely optional goal of the game is to travel to a dimension called the End, and defeat the ender dragon.`,
    price: 359.9,
    platformsAvailable: [
      IGDBPlatform.PC,
      IGDBPlatform.PlayStation5,
      IGDBPlatform.XboxSeries,
      IGDBPlatform.NintendoSwitch,
    ],
  },
  {
    id: 5,
    imageUrl: '/the_legend_of_zelda_breath_of_the_wild_banner.jpg',
    title: 'The Legend of Zelda: Breath of the Wild',
    description:
      'In this 3D open-world entry in the Zelda series, Link is awakened from a deep slumber without his past memories in the post-apocalyptic Kingdom of Hyrule, and sets off on a journey to defeat the ancient evil Calamity Ganon. Link treks, climbs and glides through fields, forests and mountain ranges while meeting and helping friendly folk and defeating enemies in order to gather up the strength to face Ganon.',
    price: 359.9,
    platformsAvailable: [IGDBPlatform.NintendoSwitch], // Nintendo Switch only
  },
  {
    id: 305152,
    title: 'Clair Obscur: Expedition 33',
    description:
      'Lead the members of Expedition 33 on their quest to destroy the Paintress so that she can never paint death again. Explore a world of wonders inspired by Belle Époque France and battle unique enemies in this turn-based RPG with real-time mechanics.',
    price: 151,
    platformsAvailable: [
      IGDBPlatform.PC,
      IGDBPlatform.PlayStation5,
      IGDBPlatform.XboxSeries,
    ],
    imageUrl: '//images.igdb.com/igdb/image/upload/t_1080p/ar2zir.jpg',
  },
  {
    id: 325594,
    title: 'Split Fiction',
    description:
      'Split Fiction is a 2025 cooperative multiplayer game. It follows two writers, Mio Hudson and Zoe Foster, as they become trapped in their imaginations.',
    price: 105,
    platformsAvailable: [
      IGDBPlatform.PC,
      IGDBPlatform.PlayStation5,
      IGDBPlatform.XboxSeries,
    ],
    imageUrl: '//images.igdb.com/igdb/image/upload/t_1080p/ar387e.jpg',
  },
]
