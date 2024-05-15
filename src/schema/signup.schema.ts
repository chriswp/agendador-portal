import { format } from 'date-fns'
import { z } from 'zod'

export const signupSchema = z
  .object({
    nome_completo: z.string().min(1, 'Digite seu nome'),
    cpf: z
      .string()
      .min(11, 'CPF tem 11 caracteres')
      .transform(cpf => cpf.replace(/[^\d]/g, '')),
    dataNascimento: z
      .date({
        errorMap: () => ({ message: 'Data inválida' }),
        description: 'Data de nascimento',
        coerce: true,
      })
      .transform(loadedData => format(loadedData, 'yyyy-MM-dd')),
    email: z.string().email({ message: 'Email inválido' }),
    password: z.string().min(6, 'Senha deve ter no minimo 6 caracteres'),
    password_confirmation: z
      .string()
      .min(6, 'Senha deve ter no minimo 6 caracteres'),
    terms_conditions: z
      .literal('on', {
        errorMap: () => ({
          message: 'Você precisa aceitar os termos e condições de uso',
        }),
      })
      .transform(arg => arg === 'on'),
    'g-recaptcha-response': z.string().min(1),
  })
  .refine(data => data.password === data.password_confirmation, {
    message: 'O campo de confirmação está diferente da senha',
    path: ['password_confirmation'],
  })

export type SignupFormType = z.infer<typeof signupSchema>
