// app/api/igdb/auth/route.ts
import { NextRequest, NextResponse } from 'next/server'

const TWITCH_TOKEN_URL = 'https://id.twitch.tv/oauth2/token'

interface TokenResponse {
  access_token: string
  expires_in: number
  token_type: string
}

export const maxDuration = 5

export async function GET() {
  const { IGDB_CLIENT_ID, IGDB_CLIENT_SECRET } = process.env
  if (!IGDB_CLIENT_ID || !IGDB_CLIENT_SECRET) {
    return NextResponse.json(
      { error: 'Missing client ID or secret' },
      { status: 500 },
    )
  }

  const url = new URL(TWITCH_TOKEN_URL)
  url.searchParams.set('client_id', IGDB_CLIENT_ID)
  url.searchParams.set('client_secret', IGDB_CLIENT_SECRET)
  url.searchParams.set('grant_type', 'client_credentials')

  const res = await fetch(url, { method: 'POST' })
  if (!res.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch token' },
      { status: res.status },
    )
  }

  const data: TokenResponse = await res.json()
  return NextResponse.json(data)
}
