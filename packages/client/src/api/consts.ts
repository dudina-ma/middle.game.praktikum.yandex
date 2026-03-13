export const APP_URL =
  process.env.APP_URL || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : ''

export const API_URL = 'https://ya-praktikum.tech/api/v2'
export const AUTH_URL = `${API_URL}/auth`
export const OAUTHYANDEX_URL = `${API_URL}/oauth/yandex`
export const REDIRECT_URI = `${APP_URL}/oauth`
export const GET_YANDEX_AUTH_URL = (service_id: string) =>
  `https://oauth.yandex.ru/authorize?response_type=code&client_id=${service_id}&redirect_uri=${REDIRECT_URI}`
