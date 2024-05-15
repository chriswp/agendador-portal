import axios, { AxiosError, HttpStatusCode } from 'axios'
import { Cookies } from 'react-cookie'

import { UserInfo } from '@/types/auth'

import authService from '../AuthService'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string,
})

instance.interceptors.request.use(
  req => {
    const cookies = new Cookies()
    const userData = cookies.get('user') as UserInfo
    if (userData) req.headers.Authorization = `Bearer ${userData.token}`

    return req
  },
  (error: AxiosError) => {
    console.log(error)
    if (error.status === HttpStatusCode.Unauthorized) {
      authService.logout()
    }
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  res => {
    const data = res.data?.data ?? res.data
    const meta = res.data?.meta ?? {}
    return {
      data,
      meta,
      status: res.status,
    }
  },
)

export const HttpInstance = instance
