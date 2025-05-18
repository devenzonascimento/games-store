import { prisma } from '@/lib/prisma'
import { User } from '@/types/user'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const result = req.cookies.get('user_summary')

  const user: User = JSON.parse(result?.value ?? '')

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userCart = await prisma.cart.findUnique({
    where: {
      userId: user.id,
    },
    select: { id: true },
  })

  if (!userCart) {
    return NextResponse.json({ error: 'Cart not found.' }, { status: 400 })
  }

  await prisma.cartItem.deleteMany({
    where: {
      cartId: userCart.id,
    },
  })

  return NextResponse.json([])
}
