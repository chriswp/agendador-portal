import { HttpInstance } from '../httpClient'

import {
  HttpResponse,
  HttpResponsePaginated,
  RequestResponse,
  TarefaResponse,
} from '@/types'
import { TarefaType } from '@/schema/tarefa.schema.ts'

const getRequests = (
  params?: Record<string, string>,
): Promise<HttpResponsePaginated<RequestResponse>> => {
  return HttpInstance.get('tarefas', { params })
}

const createTarefa = (
  request: TarefaType,
): Promise<HttpResponsePaginated<TarefaResponse>> => {
  return HttpInstance.post('tarefas', request)
}

const deleteTarefa = (
  requestId: string,
): Promise<HttpResponse<Record<string, unknown>>> =>
  HttpInstance.delete(`tarefas/${requestId}`)

export default {
  getRequests,
  createTarefa,
  deleteTarefa,
}
