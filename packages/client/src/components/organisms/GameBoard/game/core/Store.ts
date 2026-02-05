import { createEnemyShips } from '../utils/createEnemyShips'
import { EventBus } from '../utils/EventBus'

export type GamePhase = 'SETUP' | 'BATTLE' | 'RESULT'
export type cellType = 'empty' | 'ship' | 'miss' | 'hited'

export interface GameStore {
  phase: GamePhase
  playerBoard: cellType[][]
  enemyBoard: cellType[][]
  selectedShipId: string | null
  currentTurn: 'PLAYER' | 'ENEMY'
  shipsToPlace: number[]
  message: string
}

export const STORE_EVENTS = {
  STORE_UPDATE: 'update',
} as const

type TEventBus = {
  [STORE_EVENTS.STORE_UPDATE]: [state: GameStore]
}

const shipsToPlace = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]

class Store extends EventBus<TEventBus> {
  private store: GameStore = {
    shipsToPlace: shipsToPlace,
    phase: 'SETUP',
    playerBoard: Array(10)
      .fill(0)
      .map(() => Array(10).fill('empty')),
    enemyBoard: createEnemyShips(shipsToPlace),
    selectedShipId: null,
    currentTurn: 'PLAYER',
    message: `Поставьте корабль длинной 4 на поле`,
  }
  getStore() {
    return this.store
  }
  setStore(data: Partial<GameStore>) {
    Object.assign(this.store, data)
    this.emit('update', this.getStore())
  }
}

export const store = new Store()
