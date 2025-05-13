import { NextRequest, NextResponse } from 'next/server'
import igdb from 'igdb-api-node'
import { Game, IGDBPlatform, IGDBRawGame } from '@/types/game'
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
  const search = searchParams.get('search') || ''
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
    .search(search)
    .where(baseFilters)
    .limit(limit)
    .offset(offset)
    .request('/games')
    .then(r => {
      console.log(r)
      return r.data
    })

  const products = await getProductsByIgdbGameIds(raw.map(r => r.id))

  const games = raw.map(toGame)

  const productsWithGames = mergeGamesOnProducts(products, games)

  return NextResponse.json({ page, limit, itens: productsWithGames })
}
