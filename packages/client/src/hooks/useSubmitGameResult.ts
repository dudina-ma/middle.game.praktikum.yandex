import {
  LEADERBOARD_RATING_FIELD,
  LEADERBOARD_TEAM_NAME,
  useAddGameResultMutation,
} from '../api/leaderboard'
import { GameResultData, AddGameResultRequest } from '../api/leaderboard.types'

const createLeaderboardRequest = (
  gameData: GameResultData
): AddGameResultRequest => {
  return {
    data: gameData,
    ratingFieldName: LEADERBOARD_RATING_FIELD,
    teamName: LEADERBOARD_TEAM_NAME,
  }
}

export const useSubmitGameResult = () => {
  const [addGameResult, { isLoading, isError, error }] =
    useAddGameResultMutation()

  const submitGameResult = (gameData: GameResultData) => {
    const request = createLeaderboardRequest(gameData)
    return addGameResult(request)
  }

  return {
    submitGameResult,
    isLoading,
    isError,
    error,
  }
}
