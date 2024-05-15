import { AxiosResponse } from 'axios'

// export interface InputsCommonProps extends MarginProps {
//   fullWidth?: boolean
//   label?: string
//   isError?: boolean
//   errorMsg?: string
// }

export type HttpResponse<T> = Pick<AxiosResponse<T>, 'data' | 'status'>

export interface HttpResponsePaginated<T>
  extends Pick<AxiosResponse<T>, 'status'> {
  data: T[]
  meta: MetaType
}

export interface MetaType {
  pagination: PaginationMetaType
}

export interface PaginationMetaType {
  total: number
  count: number
  per_page: number
  current_page: number
  total_pages: number
  links: LinkMetaType
}

interface LinkMetaType {
  next: string
}

export interface DenyReason {
  id: number | string
  descricao: string
}

export interface NewRequestResponse {
  id: number | string
  unidade_consumidora: string
  numero_cad: string
  codigo_familiar: string
  solicitacao_status_id: string
  created_at: string
  updated_at: string
  deleted_at: string | null
  beneficiario_id: string
}

export interface TarefaStatusResponse {
  id: number | string
  descricao: string
  created_at: string
  updated_at: string
}

export interface TarefaResponse {
  id: number
  titulo: string
  descricao: string
  data_fim: string | null
  tarefa_status_id: number
  usuario_id: number
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface RequestResponse {
  id: string
  titulo: string
  descricao: string
  status: { data: TarefaStatusResponse }
}
