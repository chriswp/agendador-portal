import { Cookies } from 'react-cookie'
import { redirect } from 'react-router-dom'

import { HttpResponse } from '@/types'
import { LoginResponse, SignupResponse, UserInfo } from '@/types/auth'

import { HttpInstance } from '../httpClient'
import { LoginType } from '@/schema/login.schema.ts'
import { SignupFormType } from '@/schema/signup.schema.ts'
import { routes } from '../../router/routes.ts'

const signup = async (
  newUser: SignupFormType,
): Promise<HttpResponse<SignupResponse>> => {
  return HttpInstance.post('usuarios', { ...newUser })
}
const login = async (
  loginData: LoginType,
): Promise<HttpResponse<LoginResponse>> => {
  return HttpInstance.post('login', loginData)
}

const storeUserData = (user: UserInfo) => {
  const cookie = new Cookies(null, { path: '/' })
  cookie.set('user', user)
}

const logout = () => {
  const cookie = new Cookies(null, { path: '/' })
  cookie.remove('user')
  redirect(routes.HOME)
}

const recoveryPassword = (
  email: string,
): Promise<HttpResponse<Record<string, unknown>>> =>
  HttpInstance.post('recuperar-senha', { email })

const getUserLvl = (): UserInfo => {
  const cookie = new Cookies(null, { path: '/' })
  return cookie.get('user')
}

export default {
  signup,
  login,
  storeUserData,
  logout,
  recoveryPassword,
  getUserLvl,
}
