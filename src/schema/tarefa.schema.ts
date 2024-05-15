import { z } from 'zod'

export const TarefaSchema = z.object({
  titulo: z.string().min(5, 'Título deve ter no minimo 5 caracteres'),
  descricao: z.string().min(20, 'Descrição deve ter no minimo 20 caracteres'),
})

export type TarefaType = z.infer<typeof TarefaSchema>
