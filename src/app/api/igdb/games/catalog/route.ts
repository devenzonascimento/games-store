import { NextRequest, NextResponse } from 'next/server'
import igdb from 'igdb-api-node'
import { IGDBPlatform, IGDBRawGame } from '@/types/game'
import { toGame } from '@/helpers/igdb-game-parser'

async function fetchToken() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/igdb/auth`)
  const { access_token } = await res.json()
  return access_token as string
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

  const games = raw.map(toGame)
  return NextResponse.json({ page, limit, games })
}
