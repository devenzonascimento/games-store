import { prisma } from '@/lib/prisma'
import { UserSummary } from '@/types/user'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const result = req.cookies.get('user_summary')

  const userSummary: UserSummary = JSON.parse(result?.value ?? '')

  if (!userSummary) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  await prisma.cartItem.deleteMany({
    where: {
      cartId: userSummary.cartId,
    },
  })

  return NextResponse.json([])
}
