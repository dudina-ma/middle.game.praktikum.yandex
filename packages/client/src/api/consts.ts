export const APP_URL = import.meta.env.VITE_APP_URL

export const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || import.meta.env.MODE === 'development'
    ? 'http://localhost:3001'
    : ''

export const API_URL = 'https://ya-praktikum.tech/api/v2'
export const AUTH_URL = `${API_URL}/auth`
export const OAUTHYANDEX_URL = `${API_URL}/oauth/yandex`
export const REDIRECT_URI = `${APP_URL}/oauth`
export const GET_YANDEX_AUTH_URL = (service_id: string) =>
  `https://oauth.yandex.ru/authorize?response_type=code&client_id=${service_id}&redirect_uri=${REDIRECT_URI}`
export const LEADERBOARD_TEAM_NAME = 'middle-game-praktikum-yandex'
export const LEADERBOARD_RATING_FIELD = 'score'
