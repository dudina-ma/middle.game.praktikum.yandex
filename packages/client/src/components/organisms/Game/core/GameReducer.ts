/* eslint-disable no-case-declarations */

import { Action, IGameState } from './Types'

export function gameReducer(state: IGameState, action: Action): IGameState {
  switch (action.type) {
    case 'FIRE_SHOT':
      const boardKey = action.target === 'player' ? 'playerBoard' : 'enemyBoard'
      const newBoard = state[boardKey].map(row => [...row])
      const currentCell = newBoard[action.y][action.x]
      if (currentCell === 'ship') newBoard[action.y][action.x] = 'hited'
      else if (currentCell === 'empty') newBoard[action.y][action.x] = 'miss'

      return {
        ...state,
        [boardKey]: newBoard,
        currentTurn:
          action.target === 'enemy' && newBoard[action.y][action.x] === 'miss'
            ? 'ENEMY'
            : state.currentTurn,
        message:
          action.target === 'enemy' && newBoard[action.y][action.x] === 'miss'
            ? 'Ход противника'
            : state.message,
      }
    //... остальные
    default:
      return state
  }
}
