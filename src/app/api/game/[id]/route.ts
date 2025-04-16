import { Game } from '@/types/game'

type Params = {
  params: Promise<{ id: string }>
}

export async function GET(request: Request, { params }: Params) {
  const { id } = await params
  const game = mockGames.find(game => game.id === Number(id))

  return Response.json(game)
}

const mockGames: Game[] = [
  {
    id: 1,
    imageUrl: '/gta-6.png',
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
    imageUrl: '/horizon-forbidden-west.png',
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
    imageUrl: '/forza-horizon-5.png',
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
    imageUrl: '/minecraft.png',
    title: 'Minecraft',
    description: `Minecraft focuses on allowing the player to explore, interact with, and modify a dynamically-generated map made of one-cubic-meter-sized blocks. In addition to blocks, the environment features plants, mobs, and items. Some activities in the game include mining for ore, fighting hostile mobs, and crafting new blocks and tools by gathering various resources found in the game. The game's open-ended model allows players to create structures, creations, and artwork on various multiplayer servers or their single-player maps. Other features include redstone circuits for logic computations and remote actions, minecarts and tracks, and a mysterious underworld called the Nether. A designated but completely optional goal of the game is to travel to a dimension called the End, and defeat the ender dragon.`,
    price: 359.9,
    platformsAvailable: [0, 1, 2, 3], // PC, Xbox Series X|S, PS5, Nintendo Switch
    year: 2011,
    category: 'Sandbox',
  },
  {
    id: 5,
    imageUrl: '/zelda-breath-of-the-wild.png',
    title: 'The Legend of Zelda: Breath of the Wild',
    description:
      'In this 3D open-world entry in the Zelda series, Link is awakened from a deep slumber without his past memories in the post-apocalyptic Kingdom of Hyrule, and sets off on a journey to defeat the ancient evil Calamity Ganon. Link treks, climbs and glides through fields, forests and mountain ranges while meeting and helping friendly folk and defeating enemies in order to gather up the strength to face Ganon.',
    price: 359.9,
    platformsAvailable: [3], // Nintendo Switch only
    year: 2017,
    category: 'Action-Adventure',
  },
]
