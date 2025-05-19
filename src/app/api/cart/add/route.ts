import { prisma } from '@/lib/prisma'
import { UserSummary } from '@/types/user'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { productId } = await req.json()

  if (Number.isNaN(productId)) {
    return NextResponse.json({ error: 'Invalid product ID.' }, { status: 400 })
  }

  const result = req.cookies.get('user_summary')

  const userSummary: UserSummary = JSON.parse(result?.value ?? '')

  if (!userSummary) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  const cartItem = await prisma.cartItem.create({
    data: {
      cartId: userSummary.cartId,
      productId,
    },
  })

  return NextResponse.json({ id: cartItem.id })
}
