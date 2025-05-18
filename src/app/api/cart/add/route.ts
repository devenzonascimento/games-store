import { prisma } from '@/lib/prisma'
import { User } from '@/types/user'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { productId, platform } = await req.json()

  if (Number.isNaN(productId)) {
    return NextResponse.json({ error: 'Invalid product ID.' }, { status: 400 })
  }

  const result = req.cookies.get('user_summary')

  const user: User = JSON.parse(result?.value ?? '')

  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized, user not found.' },
      { status: 401 },
    )
  }

  let userCartId = 0

  const userCart = await prisma.cart.findUnique({
    where: {
      userId: user.id,
    },
    select: { id: true },
  })

  userCartId = userCart?.id ?? 0

  if (!userCartId) {
    const createdUserCart = await prisma.cart.create({
      data: { userId: user.id },
    })

    userCartId = createdUserCart.id
  }

  const cartItem = await prisma.cartItem.create({
    data: {
      cartId: userCartId,
      productId,
      platform,
    },
  })

  return NextResponse.json({ id: cartItem.id })
}
