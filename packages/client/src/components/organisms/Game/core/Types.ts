import { abstractController } from '../components/ui/shared/AbstractController'

export type GamePhase = 'SETUP' | 'BATTLE'
export type cellType = 'empty' | 'ship' | 'miss' | 'hited'
export type selectedShip = {
  coords: coordsType
  length: number
  direction: 'row' | 'column'
}

export type ControllerConstructor = new (...args: any[]) => abstractController

export type coordsType = {
  x: number
  y: number
}

export type positionType = {
  x: number
  y: number
  w: number
  h: number
}

export type PlayersType = 'player' | 'enemy'

export interface IGameState {
  phase: GamePhase
  playerBoard: cellType[][]
  enemyBoard: cellType[][]
  selectedShip: selectedShip | null
  currentTurn: PlayersType
  shipsToPlace: number[]
  message: string
  score: number
}

export type onFinishData = {
  result: 'win' | 'lose'
  score: number
}

export type Action =
  | { type: 'FIRE_SHOT'; target: PlayersType; x: number; y: number }
  | { type: 'PLACE_SHIP'; x: number; y: number }
  | { type: 'SET_PHASE'; phase: GamePhase }
  | { type: 'SET_MESSAGE'; message: string }
  | { type: 'ROTATE_SHIP' }
  | { type: 'UPDATE_SELECTED_SHIP'; x: number; y: number }
  | { type: 'INCREMENT_SCORE' }

export type InputActions =
  | {
      type: 'LEFT_CLICK'
      x: number
      y: number
      target: PlayersType
    }
  | {
      type: 'RIGHT_CLICK'
    }
  | {
      type: 'MOUSE_MOVE'
      x: number
      y: number
    }
