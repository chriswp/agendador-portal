export interface SignupResponse {
  nome: string
  sobrenome: string
  email: string
  token: string
}

interface UserInfo {
  nome_completo: string
  email: string
  token: string
  nivel?: 'administrador' | 'representante'
}

interface LoginResponse {
  access_token: string
  expires_in: number
  token_type: string
}

interface User {
  id: string | number
  pessoa_fisica_id: string
  usuario_nivel_id: string
  email: string
  email_verified_at: string | null
  ativo: true
  created_at: string
  updated_at: string
  deleted_at: string | null
  nomeCompleto: string
}

interface ActivationResponse {
  id: string | null
  usuario_id: string | null
  token: string
  data_expiracao: string
  created_at: string
  updated_at: string
  deleted_at: string
  usuario: User
}
