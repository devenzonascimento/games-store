import { NextRequest, NextResponse } from 'next/server'
import igdb from 'igdb-api-node'
import { Game, IGDBPlatform, IGDBRawGame, Topic } from '@/types/game'
import { toGame } from '@/helpers/igdb-game-parser'
import { Product, ProductWithGame } from '@/types/product'

async function fetchToken() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/igdb/auth`)
  const { access_token } = await res.json()
  return access_token as string
}

async function getProductsByIgdbGameIds(igdbGameIds: number[]) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      igdbIds: igdbGameIds,
    }),
  })

  const data: Product[] = await res.json()

  return data
}

function mergeGamesOnProducts(
  products: Product[],
  games: Game[],
): ProductWithGame[] {
  return games
    .map(g => {
      if (!products) {
        return null
      }

      const product = products?.find(p => p.igdbId === g.id)

      if (!product) {
        return null
      }

      return {
        ...product,
        game: g,
      }
    })
    .filter(p => p !== null)
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const topic: Topic = (searchParams.get('topic') as Topic) ?? 'top-rated'
  const page = Number(searchParams.get('page') ?? '0')
  const limit = Number(searchParams.get('limit') ?? '20')
  const offset = page * limit

  const token = await fetchToken()
  const client = igdb(process.env.IGDB_CLIENT_ID, token)

  const baseFilters = [
    'version_parent = null',
    '& category = (0,8,9)', // main, remake, remaster
    `& platforms = (
       ${IGDBPlatform.PC},
       ${IGDBPlatform.PlayStation3},
       ${IGDBPlatform.PlayStation4},
       ${IGDBPlatform.PlayStation5},
       ${IGDBPlatform.Xbox360},
       ${IGDBPlatform.XboxOne},
       ${IGDBPlatform.XboxSeries}
     )`,
    '& genres.name = ("Shooter","Adventure","Role-Playing","Battle-Royale","Strategy","Sports","Racing","Action-Adventure")',
  ].join(' ')

  const topics = {
    'top-rated': {
      where: `${baseFilters} & total_rating > 85 & total_rating_count > 700`,
      sort: {
        term: 'total_rating',
        direction: 'desc',
      },
    },
    'best-sellers': {
      where: `${baseFilters} & total_rating > 80 & total_rating_count > 1000`,
      sort: {
        term: 'popularity',
        direction: 'desc',
      },
    },
    'new-releases': {
      where: `${baseFilters} & total_rating > 80 & total_rating_count > 50 & first_release_date > ${Math.floor(Date.now() / 1000) - 90 * 24 * 3600}`,
      sort: {
        term: 'first_release_date',
        direction: 'desc',
      },
    },
    'most-played': {
      where: `${baseFilters}`,
      sort: {
        term: 'total_rating_count',
        direction: 'desc',
      },
    },
    'most-wishlisted': {
      where: `${baseFilters} & status != 2`,
      sort: {
        term: 'hypes',
        direction: 'desc',
      },
    },
    'coming-soon': {
      where: `${baseFilters} & first_release_date > ${Math.floor(Date.now() / 1000)}`,
      sort: {
        term: 'first_release_date',
        direction: 'asc',
      },
    },
  } as const

  const { where, sort } = topics[topic]

  const raw: IGDBRawGame[] = await client
    .fields([
      'id',
      'name',
      'summary',
      'first_release_date',
      'cover.url',
      'artworks.url',
      'screenshots.url',
      'platforms',
      'genres.name',
    ])
    .where(where)
    .limit(limit)
    .offset(offset)
    .sort(sort?.term, sort?.direction)
    .request('/games')
    .then(r => r.data)

  const products = await getProductsByIgdbGameIds(raw.map(r => r.id))

  const games = raw.map(toGame)

  const productsWithGames = mergeGamesOnProducts(products, games)

  return NextResponse.json({ page, limit, itens: productsWithGames })
}
