import { GAME_CONFIG } from './../GameConfig'
import { InputActions } from './Types'

export class InputManager {
  constructor(
    private canvas: HTMLCanvasElement,
    private onInput: (x: number, y: number) => void,
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

    // const { ENEMY_BOARD_POSITION, PLAYER_BOARD_POSITION } =
    //   this.config.BOARDS_POSITION
    // const { x, y, targetBoard } = checkBoardCell(
    //   e,
    //   ENEMY_BOARD_POSITION,
    //   PLAYER_BOARD_POSITION
    // )
    // this.callback({ type: 'LEFT_CLICK', x, y })
  }

  private handleMouseMove = (e: MouseEvent) => {
    const x = Math.floor(e.offsetX)
    const y = Math.floor(e.offsetY)
    this.onInput(x, y)
  }
}
