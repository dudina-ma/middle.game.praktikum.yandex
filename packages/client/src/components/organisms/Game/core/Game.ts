import { Messages } from '../components/ui/Messages'
import { Board } from '../components/ui/Board'
import { GameController } from './GameController'
import type { GAME_CONFIG } from '../GameConfig'
import { store as Gstore } from './Store'
import { AbstractElement } from '../components/ui/shared/AbstractElement'
import { cellType, IGameState, onFinishData } from './Types'
import { CheckShipsOnBoard } from '../utils/CheckShipsOnBoard'

export type TonFinish = (data: onFinishData) => unknown | void

export class Game {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private rendered: AbstractElement[]
  private interval: number
  private lastTime = 0
  private gameController: GameController
  private frame = 0
  private store = Gstore.getStore()
  private onFinish: TonFinish

  constructor(
    canvas: HTMLCanvasElement,
    config: typeof GAME_CONFIG,
    onFinish: TonFinish
  ) {
    this.interval = 1000 / config.FPS
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')!
    this.onFinish = onFinish
    this.canvas.width = config.CANVAS_SIZE.x
    this.canvas.height = config.CANVAS_SIZE.y
    this.rendered = [
      new Messages({
        ctx: this.ctx,
        position: config.MESSAGES_POSITION,
        config,
        store: this.store,
      }),
      new Board({
        position: config.BOARDS_POSITION.ENEMY_BOARD_POSITION,
        ctx: this.ctx,
        boardType: 'enemy',
        config,
        store: this.store,
      }),

      new Board({
        position: config.BOARDS_POSITION.PLAYER_BOARD_POSITION,
        ctx: this.ctx,
        boardType: 'player',
        config,
        store: this.store,
      }),
    ]

    Gstore.on('update', this.update)

    this.gameController = new GameController(config, this.canvas)
    this.gameController.init()
  }

  private update = (store: IGameState) => {
    const { playerBoard, enemyBoard, phase } = store
    this.rendered.forEach(el => {
      el.update(store)
    })

    if (phase === 'BATTLE') {
      this.checkWinner(playerBoard, enemyBoard)
    }
  }

  private finishGame(data: onFinishData) {
    this.destroy()
    this.onFinish(data)
  }

  private checkWinner(playerBoard: cellType[][], enemyBoard: cellType[][]) {
    const { score } = this.store
    if (!CheckShipsOnBoard(playerBoard)) {
      this.finishGame({ result: 'lose', score: 0 })
    }
    if (!CheckShipsOnBoard(enemyBoard)) {
      this.finishGame({ result: 'win', score })
    }
  }

  public destroy() {
    cancelAnimationFrame(this.frame)
    Gstore.off('update', this.update)
    this.gameController.destroy()
  }

  public render(currentTime = 0) {
    this.frame = requestAnimationFrame(time => this.render(time))
    const deltaTime = currentTime - this.lastTime

    if (deltaTime > this.interval) {
      this.lastTime = currentTime - (deltaTime % this.interval)
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.rendered.forEach(element => {
        element.render()
      })
    }
  }
}
