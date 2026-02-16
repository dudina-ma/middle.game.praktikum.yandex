export interface GameResultData {
  user_id: number
  score: number
  game_time_seconds: number
  total_shots: number
  ships_sunk: number
  date: number // timestamp
}

export interface AddGameResultRequest {
  data: GameResultData
  ratingFieldName: string
  teamName: string
}

export type AddGameResultResponse = void

export interface FetchLeaderboardRequest {
  teamName: string
  ratingFieldName: string
  cursor: number
  limit: number
}

export interface LeaderboardEntry {
  data: {
    user_id: number
    display_name: string
    score: number
    game_time_seconds?: number
    total_shots?: number
    ships_sunk?: number
    date?: number
  }
}

export interface FetchLeaderboardResponse {
  data: LeaderboardEntry[]
}
