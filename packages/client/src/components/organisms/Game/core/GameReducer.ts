import { fireShot } from './../utils/FireShot'
/* eslint-disable no-case-declarations */
import { validatePlacement } from '../utils/ValidateShip'
import { Action, IGameState, cellType } from './Types'

const cloneBoard = (board: cellType[][]): cellType[][] =>
  board.map(row => [...row])

const getShipCoordinates = (
  x: number,
  y: number,
  length: number,
  direction: 'row' | 'column'
) => {
  return Array.from({ length }, (_, i) => ({
    x: direction === 'row' ? x + i : x,
    y: direction === 'column' ? y + i : y,
  }))
}

const handleFireShot = (
  state: IGameState,
  action: Extract<Action, { type: 'FIRE_SHOT' }>
): IGameState => {
  const boardKey = action.target === 'PLAYER' ? 'playerBoard' : 'enemyBoard'
  const newBoard = cloneBoard(state[boardKey])
  const { x, y } = action

  const { board, result } = fireShot({ x, y }, newBoard)
  let nextTurn = state.currentTurn
  if (result !== 'hit') {
    nextTurn = nextTurn === 'ENEMY' ? 'PLAYER' : 'ENEMY'
  }
  return {
    ...state,
    [boardKey]: board,
    currentTurn: nextTurn,
    message: nextTurn === 'ENEMY' ? 'Ход противника' : 'Ваш ход',
  }
}

const handlePlaceShip = (
  state: IGameState,
  action: Extract<Action, { type: 'PLACE_SHIP' }>
): IGameState => {
  const { x, y } = action
  const { shipsToPlace, playerBoard, selectedShip } = state
  const currentShipLen = shipsToPlace[0]
  const direction = selectedShip?.direction || 'row'

  if (!validatePlacement(playerBoard, x, y, currentShipLen, direction)) {
    return state
  }

  const newBoard = cloneBoard(playerBoard)
  const coords = getShipCoordinates(x, y, currentShipLen, direction)

  coords.forEach(({ x, y }) => {
    newBoard[y][x] = 'ship'
  })

  const nextShips = shipsToPlace.slice(1)
  const nextLen = nextShips[0] || 0

  return {
    ...state,
    playerBoard: newBoard,
    shipsToPlace: nextShips,
    selectedShip: { ...selectedShip!, length: nextLen },
    message:
      nextShips.length > 0
        ? `Поставьте корабль длиной ${nextLen} на поле`
        : 'Все корабли расставлены',
  }
}

export function gameReducer(state: IGameState, action: Action): IGameState {
  switch (action.type) {
    case 'FIRE_SHOT':
      return handleFireShot(state, action)

    case 'PLACE_SHIP':
      return handlePlaceShip(state, action)

    case 'SET_PHASE':
      return { ...state, phase: action.phase }

    case 'ROTATE_SHIP':
      if (!state.selectedShip) return state
      return {
        ...state,
        selectedShip: {
          ...state.selectedShip,
          direction: state.selectedShip.direction === 'row' ? 'column' : 'row',
        },
      }

    case 'UPDATE_SELECTED_SHIP':
      if (!state.selectedShip) return state
      return {
        ...state,
        selectedShip: {
          ...state.selectedShip,
          coords: { x: action.x, y: action.y },
        },
      }
    case 'INCREMENT_SCORE':
      console.log(state.score + 1)

      return {
        ...state,
        score: state.score + 1,
      }

    default:
      return state
  }
}
