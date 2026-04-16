export const APP_URL = 'http://localhost:3000'
export const API_URL = `/yandex`
export const INTERNAL_API_URL = `/api`
export const AUTH_URL = `${API_URL}/auth`
export const OAUTHYANDEX_URL = `${API_URL}/oauth/yandex`
export const REDIRECT_URI = `${APP_URL}/oauth`
export const GET_YANDEX_AUTH_URL = (service_id: string) =>
  `https://oauth.yandex.ru/authorize?response_type=code&client_id=${service_id}&redirect_uri=${REDIRECT_URI}`
export const LEADERBOARD_TEAM_NAME = 'middle-game-praktikum-yandex'
export const LEADERBOARD_RATING_FIELD = 'score'
