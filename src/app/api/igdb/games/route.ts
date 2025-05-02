import { NextRequest, NextResponse } from 'next/server'
import igdb from 'igdb-api-node'
import { IGDBRawGame } from '@/types/game'
import { toGame } from '@/helpers/igdb-game-parser'

async function fetchToken() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/igdb/auth`)
  const { access_token } = await res.json()
  return access_token as string
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page = Number(searchParams.get('page') ?? '0')
  const limit = Number(searchParams.get('limit') ?? '20')
  const offset = page * limit

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
    // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
    .where(`version_parent = null & category = 0 & total_rating_count > 1000`)
    .limit(limit)
    .offset(offset)
    .sort('total_rating_count', 'desc')
    .request('/games')
    .then(r => r.data)

  const games = raw.map(toGame)
  return NextResponse.json({ page, limit, games })
}
