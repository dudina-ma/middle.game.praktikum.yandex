import type { coordsType } from '../components/shared/Sprite'
import type { GameController } from '../core/GameController'
import { store } from '../core/Store'

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
  RESULT: (coords: coordsType, controller: GameController) => {
    ;('')
  },
}
