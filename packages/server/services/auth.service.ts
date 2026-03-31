import { YANDEX_API_URL } from './../api/consts'
import type { AuthUser } from '../types/auth'

export const fetchYandexUser = async (cookie: string | undefined) => {
  const response = await fetch(`${YANDEX_API_URL}/auth/user`, {
    method: 'GET',
    headers: { Cookie: cookie || '' },
  })

  const setCookie = response.headers.get('set-cookie')

  if (!response.ok) {
    return { ok: false, status: response.status, setCookie }
  }

  const user = (await response.json()) as AuthUser
  return { ok: true, user, setCookie }
}
