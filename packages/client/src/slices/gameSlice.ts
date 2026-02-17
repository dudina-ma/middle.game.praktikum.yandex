import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type GamePhase = 'start' | 'game' | 'victory' | 'defeat'

interface GameState {
  phase: GamePhase
  score: number
}
type GameResult = 'win' | 'lose'

const initialState: GameState = {
  phase: 'start',
  score: 0,
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: state => {
      state.phase = 'game'
      state.score = 0
    },
    finishGame: (
      state,
      action: PayloadAction<{ result: GameResult; score: number }>
    ) => {
      const { result, score } = action.payload
      state.phase = result === 'win' ? 'victory' : 'defeat'
      state.score = score
    },
    resetGame: state => {
      state.phase = 'start'
      state.score = 0
    },
    updateScore: (state, action: PayloadAction<number>) => {
      state.score = action.payload
    },
  },
})

export const selectIsGameRunning = (state: { game: GameState }) =>
  state.game.phase === 'game'

export const selectIsGameOver = (state: { game: GameState }) =>
  state.game.phase === 'victory' || state.game.phase === 'defeat'

export const selectIsInMenu = (state: { game: GameState }) =>
  state.game.phase === 'start'

export const { startGame, finishGame, resetGame, updateScore } =
  gameSlice.actions
export default gameSlice.reducer
