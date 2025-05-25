'use server'

import { compare } from 'bcrypt'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { createAuthToken } from '@/lib/auth'
import { cookies } from 'next/headers'
import { UserSummary } from '@/types/user'

const dispatchError = (error: string) => {
  redirect(`/login?error=${encodeURIComponent(error)}`)
}

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    dispatchError('Invalid credentials')
    return
  }

  const isPasswordValid = await compare(password, user.password)

  if (!isPasswordValid) {
    dispatchError('Invalid credentials')
    return
  }

  const cartId = await getCartIdService(user.id)

  const userSummary: UserSummary = {
    id: user.id,
    name: user.name,
    email: user.email,
    cartId,
  }

  const token = await createAuthToken(userSummary)

  const cookiesStore = await cookies()

  cookiesStore.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  })

  cookiesStore.set('user_summary', JSON.stringify(userSummary), {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  })

  redirect('/store')
}

const getCartIdService = async (userId: number) => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    select: { id: true },
  })

  if (!cart) {
    const createdUserCart = await prisma.cart.create({
      data: { userId },
    })

    return createdUserCart.id
  }

  return cart.id
}
