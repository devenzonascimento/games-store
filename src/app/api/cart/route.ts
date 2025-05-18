import { prisma } from '@/lib/prisma'
import { User } from '@/types/user'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const result = req.cookies.get('user_summary')

  const user: User = JSON.parse(result?.value ?? '')

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const cartItemsRaw = await prisma.cart.findUnique({
    where: {
      userId: user.id,
    },
    select: {
      items: {        
        select: {
          id: true,
          product: {
            omit: {
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      },
    },
  })

  const cartItems = (cartItemsRaw?.items ?? [])?.map(i => {
    return {
      cartItemId: i.id,
      ...i.product
    }
  })

  return NextResponse.json(cartItems)
}
