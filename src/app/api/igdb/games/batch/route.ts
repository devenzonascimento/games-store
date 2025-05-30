import { NextRequest, NextResponse } from 'next/server'
import igdb from 'igdb-api-node'
import { Game, IGDBRawGame } from '@/types/game'
import { toGame } from '@/helpers/igdb-game-parser'
import { Product, ProductWithGame } from '@/types/product'
import { BASE_URL } from '@/helpers/base-url'

async function fetchToken() {
  const res = await fetch(`${BASE_URL}/api/igdb/auth`)
  const { access_token } = await res.json()
  return access_token as string
}

async function getProductsByIgdbGameIds(igdbGameIds: number[]) {
  const url = `${BASE_URL}/api/products`

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

export async function POST(req: NextRequest) {
  try {
    const { ids } = await req.json()

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json([])
    }

    if (ids.length > 20) {
      return NextResponse.json(
        { error: 'Too many ids requested. Maximum is 20.' },
        { status: 400 },
      )
    }

    const token = await fetchToken()
    const client = igdb(process.env.IGDB_CLIENT_ID, token)

    const rawGames = await client
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
      .where(`id = (${ids.join(',')})`)
      .request('/games')
      .then(r => r.data as IGDBRawGame[])

    if (!rawGames.length) {
      return NextResponse.json({ error: 'No games found' }, { status: 404 })
    }

    const games = rawGames.map(toGame)
    const products = await getProductsByIgdbGameIds(ids)
    const productsWithGames = mergeGamesOnProducts(products, games)

    return NextResponse.json(productsWithGames)
  } catch (error) {
    console.error('Batch games fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch games' },
      { status: 500 },
    )
  }
}
