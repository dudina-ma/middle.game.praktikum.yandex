import { createEnemyShips } from '../utils/CreateEnemyShips'
import { EventBus } from '../utils/EventBus'
import { gameReducer } from './GameReducer'
import { Action, IGameState } from './Types'

export const STORE_EVENTS = {
  STORE_UPDATE: 'update',
} as const

type TEventBus = {
  [STORE_EVENTS.STORE_UPDATE]: [state: IGameState]
}

const shipsToPlace = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]

export class Store extends EventBus<TEventBus> {
  private state: IGameState = {
    shipsToPlace: shipsToPlace,
    phase: 'SETUP',
    playerBoard: Array(10)
      .fill(0)
      .map(() => Array(10).fill('empty')),
    enemyBoard: createEnemyShips(shipsToPlace),
    selectedShip: { coords: { x: 0, y: 0 }, direction: 'row', length: 4 },
    currentTurn: 'PLAYER',
    message: `Поставьте корабль длинной 4 на поле`,
    score: 100,
  }

  getState() {
    return this.state
  }

  dispatch(action: Action) {
    this.state = gameReducer(this.state, action)

    this.emit('update', this.getState())
  }
}
