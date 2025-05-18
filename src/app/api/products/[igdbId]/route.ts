// app/api/products/[igdbId]/route.ts

import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  generateRandomPrice,
  generateRandomDiscount,
} from '@/helpers/product-seed'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ igdbId: string }> },
) {
  const igdbId = Number.parseInt((await params)?.igdbId)

  if (Number.isNaN(igdbId)) {
    return new Response(JSON.stringify({ error: 'Invalid IGDB ID' }), {
      status: 400,
    })
  }

  let product = await prisma.product.findUnique({ where: { igdbId } })

  if (!product) {
    const price = generateRandomPrice()
    const discount = generateRandomDiscount()

    product = await prisma.product.create({
      data: {
        igdbId,
        price,
        discountType: discount.type,
        discountValue: discount.value,
      },
    })
  }

  return new Response(JSON.stringify(product))
}
