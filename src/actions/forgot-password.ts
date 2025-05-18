'use server'

import { prisma } from '@/lib/prisma'
import { hash } from 'bcrypt'
import { redirect } from 'next/navigation'

const dispatchError = (error: string) => {
  redirect(`/forgot-password?error=${encodeURIComponent(error)}`)
}

const dispatchSuccess = (success: string) => {
  redirect(`/forgot-password?success=${encodeURIComponent(success)}`)
}

export async function forgotPasswordAction(formData: FormData) {
  const email = formData.get('email') as string

  if (!email) {
    dispatchError('Email is required')
    return
  }

  const user = await prisma.user.findUnique({
    where: { email: email },
  })

  if (!user) {
    dispatchError('User not found')
    return
  }

  // Gera uma senha temporária
  const temporaryPassword = Math.random().toString(36).slice(-8)
  const hashedPassword = await hash(temporaryPassword, 10)

  await prisma.user.update({
    where: { email: email },
    data: { password: hashedPassword },
  })

  dispatchSuccess('We have sent a temporary password to your email.')
}
