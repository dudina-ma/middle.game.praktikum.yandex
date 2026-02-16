import { checkBoardCell, checkClick, coordsToCell } from '../utils/ClickUtils'
import { GAME_CONFIG } from './../GameConfig'
import { InputActions } from './Types'

export class InputManager {
  constructor(
    private canvas: HTMLCanvasElement,
    private signal: AbortSignal,
    private callback: (action: InputActions) => void | unknown,
    private config: typeof GAME_CONFIG
  ) {}

  init() {
    this.canvas.addEventListener('mousedown', this.handleMouseDown, {
      signal: this.signal,
    })
    this.canvas.addEventListener('mousemove', this.handleMouseMove, {
      signal: this.signal,
    })
  }

  private handleMouseDown = (e: MouseEvent) => {
    if (e.button === 2) {
      e.preventDefault()
      this.callback({ type: 'RIGHT_CLICK' })
      return
    }
    const { ENEMY_BOARD_POSITION, PLAYER_BOARD_POSITION } =
      this.config.BOARDS_POSITION
    const res = checkBoardCell(e, ENEMY_BOARD_POSITION, PLAYER_BOARD_POSITION)
    if (!res) return
    const { x, y, targetBoard } = res

    this.callback({ type: 'LEFT_CLICK', x, y, target: targetBoard })
  }

  private handleMouseMove = (e: MouseEvent) => {
    const { PLAYER_BOARD_POSITION } = this.config.BOARDS_POSITION
    if (checkClick({ x: e.offsetX, y: e.offsetY }, PLAYER_BOARD_POSITION)) {
      const { x, y } = coordsToCell(
        { x: e.offsetX, y: e.offsetY },
        PLAYER_BOARD_POSITION
      )
      this.callback({ type: 'MOUSE_MOVE', x, y })
    }
  }
}
