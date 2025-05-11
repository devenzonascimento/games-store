import { NextRequest, NextResponse } from 'next/server'
import igdb from 'igdb-api-node'
import { IGDBPlatform, IGDBRawGame, Topic } from '@/types/game'
import { toGame } from '@/helpers/igdb-game-parser'

async function fetchToken() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/igdb/auth`)
  const { access_token } = await res.json()
  return access_token as string
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

  const games = raw.map(toGame)
  return NextResponse.json({ page, limit, games })
}

// Plataforma         | ID

// PC (Windows)       | 6
// PlayStation 1      | 7
// PlayStation 2      | 8
// PlayStation 3      | 9
// PlayStation 4      | 48
// PlayStation 5      | 167
// Xbox               | 11
// Xbox 360           | 12
// Xbox One           | 49
// Xbox Series        | 169
// Nintendo Switch    | 130

// Ícone | Tópico | Descrição | Query IGDB

// 🏆 Winner
// Jogos com as notas mais altas
// sql<br>fields id,name,cover.url,total_rating;
// where ${baseFilters} & total_rating != null;
// sort total_rating desc;
// limit 12;

// 💰 Best Sellers
// Proxy de vendas via popularidade
// sql<br>fields id,name,cover.url,popularity;
// where ${baseFilters};
// sort popularity desc;
// limit 12;

// 🆕 New Releases
// Lançamentos dos últimos 60 dias
// sql<br>fields id,name,cover.url,first_release_date;
// where ${baseFilters} & first_release_date > ${Math.floor(Date.now()/1000) - 60*24*3600};
// sort first_release_date desc;
// limit 12;

// 🎮 Most Played
// Jogos com mais avaliações (engajamento alto)
// sql<br>fields id,name,cover.url,total_rating_count;
// where ${baseFilters};
// sort total_rating_count desc;
// limit 12;

// ❤️ Most Wishlisted
// Jogos com mais “hypes” antes do lançamento
// sql<br>fields id,name,cover.url,hypes,status;
// where ${baseFilters} & status != 2;
// sort hypes desc;
// limit 12;

// 📅 Coming Soon
// Próximos lançamentos
// sql<br>fields id,name,cover.url,first_release_date;
// where ${baseFilters} & first_release_date > ${Math.floor(Date.now()/1000)};
// sort first_release_date asc;
// limit 12;
