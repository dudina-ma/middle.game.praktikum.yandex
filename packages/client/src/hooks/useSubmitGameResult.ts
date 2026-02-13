import { useAddGameResultMutation } from '../api/leaderboard'
import { GameResultData, AddGameResultRequest } from '../api/leaderboard.types'

const createLeaderboardRequest = (
  gameData: GameResultData
): AddGameResultRequest => {
  return {
    data: gameData,
    ratingFieldName: 'score',
    teamName: 'Battleship',
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
