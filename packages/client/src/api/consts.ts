export const APP_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''

export const API_URL = 'https://ya-praktikum.tech/api/v2'
export const AUTH_URL = `${API_URL}/auth`
export const OAUTHYANDEX_URL = `${API_URL}/oauth/yandex`
export const REDIRECT_URI = `${APP_URL}/oauth`
