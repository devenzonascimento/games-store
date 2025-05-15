'use server'

import { compare } from 'bcrypt'
import { prisma } from '@/lib/prisma'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function loginAction(_: any, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      omit: {
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!user) {
      return { error: 'Invalid credentials' }
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      return { error: 'Invalid credentials' }
    }
    
    const { password: _, ...userWithoutPassword } = user

    return { success: true, user: userWithoutPassword }
  } catch (error) {
    return { error: 'Something went wrong' }
  }
}
