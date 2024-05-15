import { HttpResponse } from '@/types'

import { HttpInstance } from './httpClient'

const getUserData = async (): Promise<
  HttpResponse<{
    nome_completo: string
    email: string
    nivel: 'administrador' | 'representante'
  }>
> => {
  return HttpInstance.get('getaccount')
}

export default { getUserData }
