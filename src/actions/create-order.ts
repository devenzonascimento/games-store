'use server'

import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { User } from '@/types/user'

export async function createOrderAction() {
  try {
    // 1. Pega o userId dos cookies
    const cookieStore = await cookies()
    const result = cookieStore.get('user_summary')
    const user: User = JSON.parse(result?.value ?? '')
    const userId = user?.id

    if (!userId) return { error: 'Unauthorized' }

    // 2. Busca o cart e os cartItems do usuário
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: { product: true },
        },
      },
    })
    if (!cart || cart.items.length === 0) return { error: 'Cart is empty' }

    // 3. Calcula totalPrice e totalDiscount
    let totalPrice = 0
    let totalDiscount = 0
    const orderItemsData = cart.items.map(item => {
      const price = item.product.price
      const discountType = item.product.discountType
      const discountValue = item.product.discountValue || 0

      let discount = 0
      if (discountType === 'PERCENTAGE') {
        discount = price * (discountValue / 100)
      } else if (discountType === 'FIXED') {
        discount = discountValue
      }
      totalPrice += price
      totalDiscount += discount

      return {
        productId: item.productId,
        price,
        discountType,
        discountValue,
      }
    })

    // 4. Cria a order e os orderItems em uma transação
    const order = await prisma.$transaction(async tx => {
      const newOrder = await tx.order.create({
        data: {
          userId,
          status: 'PENDING',
          totalPrice,
          totalDiscount,
          items: {
            create: orderItemsData,
          },
        },
        include: { items: true },
      })

      // Limpa o carrinho após criar o pedido
      await tx.cartItem.deleteMany({ where: { cartId: cart.id } })

      return newOrder
    })

    revalidatePath('/orders')
    return { success: true, orderId: order.id }
  } catch (error) {
    console.error('Create order error:', error)
    return { error: 'Failed to create order' }
  }
}
