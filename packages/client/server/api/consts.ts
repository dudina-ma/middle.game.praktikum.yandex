import 'dotenv/config'
export const isDev = process.env.NODE_ENV === 'development'

export const YANDEX_API_URL =
  process?.env.YANDEX_API_URL || 'https://ya-praktikum.tech/api/v2'
export const BACKEND_SERVER_URL = isDev
  ? process?.env.EXTERNAL_SERVER_URL
  : process?.env.INTERNAL_SERVER_URL || 'http://server:3001'
export const VITE_APP_DOMAIN = isDev
  ? 'localhost'
  : process?.env.VITE_APP_DOMAIN
