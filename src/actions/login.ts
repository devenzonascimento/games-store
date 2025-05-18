'use server'

import { compare } from 'bcrypt'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { createAuthToken } from '@/lib/auth'
import { cookies } from 'next/headers'

const dispatchError = (error: string) => {
  redirect(`/login?error=${encodeURIComponent(error)}`)
}

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const user = await prisma.user.findUnique({
    where: { email },
    omit: {
      createdAt: true,
      updatedAt: true,
    },
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

  const userPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
  }

  const token = await createAuthToken(userPayload)

  const cookiesResult = await cookies()

  cookiesResult.set('auth_token', token, {
    httpOnly: true,
    secure: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  })

  cookiesResult.set('user_summary', JSON.stringify(userPayload), {
    httpOnly: false,
    secure: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  })

  redirect('/store')
}
