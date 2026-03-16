export type RatingFieldName = 'score'

export interface GameResultData {
  user_id: number
  display_name?: string
  score: number
  date: number
}

export interface AddGameResultRequest {
  data: GameResultData
  ratingFieldName: RatingFieldName
  teamName: string
}

export type AddGameResultResponse = void

export interface FetchLeaderboardRequest {
  teamName: string
  ratingFieldName: RatingFieldName
  cursor: number
  limit: number
}

export interface LeaderboardEntry {
  data: GameResultData
}

export type FetchLeaderboardResponse = LeaderboardEntry[]
