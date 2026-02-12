import { createEnemyShips } from '../utils/CreateEnemyShips'
import { EventBus } from '../utils/EventBus'
import { IGameStore } from './Types'

export const STORE_EVENTS = {
  STORE_UPDATE: 'update',
} as const

type TEventBus = {
  [STORE_EVENTS.STORE_UPDATE]: [state: IGameStore]
}

const shipsToPlace = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]

class Store extends EventBus<TEventBus> {
  private store: IGameStore = {
    shipsToPlace: shipsToPlace,
    phase: 'SETUP',
    playerBoard: Array(10)
      .fill(0)
      .map(() => Array(10).fill('empty')),
    enemyBoard: createEnemyShips(shipsToPlace),
    selectedShip: null,
    currentTurn: 'PLAYER',
    message: `Поставьте корабль длинной 4 на поле`,
  }

  getStore() {
    return this.store
  }
  setStore(data: Partial<IGameStore>) {
    Object.assign(this.store, data)
    this.emit('update', this.getStore())
  }
}

export const store = new Store()
