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

async function getProductByIgdbGameId(igdbGameId: number) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${igdbGameId}`

  const res = await fetch(url)

  const data: Product = await res.json()

  return data
}

function mergeGameOnProduct(product: Product, game: Game): ProductWithGame {
  return {
    ...product,
    game,
  }
}

export async function GET(req: NextRequest) {
  const { pathname } = new URL(req.url)
  const id = Number(pathname.split('/').pop())

  const token = await fetchToken()
  const client = igdb(process.env.IGDB_CLIENT_ID, token)

  const [raw] = await client
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
    .where(`id = ${id}`)
    .request('/games')
    .then(r => r.data as IGDBRawGame[])

  if (!raw) {
    return NextResponse.json({ error: 'Game not found' }, { status: 404 })
  }

  const product = await getProductByIgdbGameId(raw.id)

  const productWIthGame = mergeGameOnProduct(product, toGame(raw))

  return NextResponse.json(productWIthGame)
}
