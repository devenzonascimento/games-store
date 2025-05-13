import { prisma } from '@/lib/prisma'
import {
  generateRandomPrice,
  generateRandomDiscount,
} from '@/helpers/product-seed'
import { NextRequest, NextResponse } from 'next/server'
import { DiscountType } from '@prisma/client'

export async function POST(req: NextRequest) {
  const { igdbIds } = await req.json()

  if (!Array.isArray(igdbIds) || igdbIds.length === 0) {
    return NextResponse.json(
      { error: 'Lista de igdbIds inválida.' },
      { status: 400 },
    )
  }

  const uniqueIgdbIds = [...new Set(igdbIds.filter(id => Number.isInteger(id)))]

  // Buscar os produtos já existentes
  const existingProducts = await prisma.product.findMany({
    where: { igdbId: { in: uniqueIgdbIds } },
  })

  const existingMap = new Map(existingProducts.map(p => [p.igdbId, p]))

  // Gerar os produtos faltantes
  const toCreate = uniqueIgdbIds
    .filter(id => !existingMap.has(id))
    .map(igdbId => {
      const price = generateRandomPrice()
      const discount = generateRandomDiscount()

      return {
        igdbId,
        price,
        discountType: (discount.type?.toUpperCase() as DiscountType) ?? null,
        discountValue: discount.value ?? null,
      }
    })

  if (toCreate.length > 0) {
    await prisma.product.createMany({
      data: toCreate.map(i => ({
        igdbId: i.igdbId,
        price: i.price,
        discountType: i.discountType,
        discountValue: i.discountValue,
      })),
    })
  }

  const allProducts = await prisma.product.findMany({
    where: {
      igdbId: {
        in: uniqueIgdbIds,
      },
    },
    select: {
      id: true,
      igdbId: true,
      price: true,
      discountType: true,
      discountValue: true,
    },
  })

  return NextResponse.json(allProducts)
}
