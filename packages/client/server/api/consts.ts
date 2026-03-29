import 'dotenv/config'
export const YANDEX_API_URL = 'https://ya-praktikum.tech/api/v2'
export const BACKEND_SERVER_URL =
  process?.env.BACKEND_SERVER_URL || 'http://localhost:3001'
export const APP_DOMAIN = process?.env.APP_DOMAIN || 'localhost'
