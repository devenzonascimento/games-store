import { NextRequest, NextResponse } from 'next/server'
import igdb from 'igdb-api-node'
import { Game, IGDBRawGame } from '@/types/game'
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
  const token = await fetchToken()
  const client = igdb(process.env.IGDB_CLIENT_ID, token)

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
    .where(
      `name = ("Grand Theft Auto VI", "Horizon Forbidden West", "Assassin's Creed Shadows", "Ghost of Tsushima", "Resident Evil 2", "The Legend of Zelda: Tears of the Kingdom", "God of War", "Indiana Jones and the Great Circle") & first_release_date > ${Math.floor(new Date('2012-01-01').getTime() / 1000)}`,
    )
    .request('/games')
    .then(r => r.data)

  const products = await getProductsByIgdbGameIds(raw.map(r => r.id))

  const games = raw.map(toGame)

  const productsWithGames = mergeGamesOnProducts(products, games)

  return NextResponse.json(productsWithGames)
}
