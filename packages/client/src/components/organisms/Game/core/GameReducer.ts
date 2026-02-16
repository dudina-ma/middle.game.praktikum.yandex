/* eslint-disable no-case-declarations */

import { validatePlacement } from '../utils/ValidateShip'
import { Action, IGameState } from './Types'

export function gameReducer(state: IGameState, action: Action): IGameState {
  const getNewBoard = (boardKey: 'playerBoard' | 'enemyBoard') =>
    state[boardKey].map(row => [...row])

  switch (action.type) {
    case 'FIRE_SHOT':
      const boardKey = action.target === 'PLAYER' ? 'playerBoard' : 'enemyBoard'
      const newBoard = getNewBoard(boardKey)
      const currentCell = newBoard[action.y][action.x]
      if (currentCell === 'ship') newBoard[action.y][action.x] = 'hited'
      else if (currentCell === 'empty') newBoard[action.y][action.x] = 'miss'

      return {
        ...state,
        [boardKey]: newBoard,
        currentTurn:
          action.target === 'ENEMY' && newBoard[action.y][action.x] === 'miss'
            ? 'ENEMY'
            : state.currentTurn,
        message:
          action.target === 'ENEMY' && newBoard[action.y][action.x] === 'miss'
            ? 'Ход противника'
            : state.message,
      }
    case 'PLACE_SHIP':
      const { x, y } = action
      const { shipsToPlace, playerBoard, selectedShip } = state
      const currentShip = shipsToPlace[0]
      const direction = selectedShip?.direction || 'row'

      if (validatePlacement(playerBoard, x, y, currentShip, direction)) {
        const newBoard = getNewBoard('playerBoard')
        const shipCoord = Array(currentShip)
          .fill(0)
          .map((_, i) => {
            if (direction === 'row') {
              return { x: x + i, y: y }
            } else {
              return { x: x, y: y + i }
            }
          })
        shipCoord.forEach(({ x, y }) => {
          newBoard[y][x] = 'ship'
        })

        const newShipsToPlace = [...shipsToPlace.slice(1, shipsToPlace.length)]
        return {
          ...state,
          playerBoard: newBoard,
          shipsToPlace: newShipsToPlace,
          message: `Поставьте корабль длинной ${newShipsToPlace[0]} на поле`,
        }
      }
      return state
    case 'SET_PHASE':
      return {
        ...state,
        phase: action.phase,
      }
    case 'ROTATE_SHIP':
      if (selectedShip) {
        const direction = selectedShip.direction === 'row' ? 'column' : 'row'
        return { ...state, selectedShip: { ...selectedShip, direction } }
      }
      return state
    default:
      return state
  }
}
