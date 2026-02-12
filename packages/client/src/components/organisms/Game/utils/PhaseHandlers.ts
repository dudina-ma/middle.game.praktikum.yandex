import type { GameController } from '../core/GameController'
import { store } from '../core/Store'
import { coordsType } from '../core/Types'

export const PhaseHandlers = {
  SETUP: (coords: coordsType, controller: GameController) => {
    controller.placeShip(coords)
  },
  BATTLE: (coords: coordsType, controller: GameController) => {
    const { currentTurn } = store.getStore()
    if (currentTurn === 'PLAYER') {
      controller.playerHandler(coords)
    }
  },
}
