'use server'

import { hash } from 'bcrypt'
import { prisma } from '@/lib/prisma'

type RegisterFormData = {
  name: string
  email: string
  document: string
  telephone: string
  password: string
  confirmPassword: string
}

// biome-ignore lint/suspicious/noExplicitAny: _
export async function registerAction(_: any, formData: FormData) {
  const data: RegisterFormData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    document: formData.get('document') as string,
    telephone: formData.get('telephone') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
  }

  if (data.password !== data.confirmPassword) {
    return { error: 'Passwords do not match' }
  }

  try {
    const hashedPassword = await hash(data.password, 10)

    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        document: data.document,
        telephone: data.telephone,
        password: hashedPassword,
      },
      omit: {
        password: true,
      },
    })

    return { success: true, user: newUser }
  } catch (error) {
    return { error: 'Registration failed' }
  }
}
