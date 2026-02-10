import { abstractController } from '../components/shared/abstractComponents/AbstractController'

export class Inputs extends abstractController {
  constructor() {
    super()
    document.addEventListener('mousedown', this.handleMouseDown)
  }

  private handleMouseDown = (e: MouseEvent) => {
    // const { phase } = store.getStore()
    // const { ENEMY_BOARD_POSITION, PLAYER_BOARD_POSITION } =
    //   this.config.BOARDS_POSITION
    // const coords = { x: e.offsetX, y: e.offsetY }
    // const boardCoords =
    //   phase === 'SETUP' ? PLAYER_BOARD_POSITION : ENEMY_BOARD_POSITION
    // if (!checkClick(coords, boardCoords)) return
    // const cell = coordsToCell(coords, boardCoords)
    // PhaseHandlers[phase]?.(cell, this)
  }
}
