import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1),
})

export type LoginType = z.infer<typeof LoginSchema>
