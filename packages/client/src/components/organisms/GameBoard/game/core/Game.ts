import { Messages } from '../components/Messages'
import { Board } from '../components/Board'
import { GameController } from './GameController'
import type { GAME_CONFIG } from '../GameConfig'
import { GameStore, store as Gstore } from './Store'
import { AbstractElement } from '../components/shared/abstractComponents/AbstractElement'

export class Game {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private rendered: AbstractElement[]
  private interval: number
  private lastTime = 0
  private gameController: GameController
  private frame = 0
  private store = Gstore.getStore()

  constructor(canvas: HTMLCanvasElement, config: typeof GAME_CONFIG) {
    this.interval = 1000 / config.FPS
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')!
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

    this.gameController = new GameController(config)
    this.gameController.init()
  }

  update = (store: GameStore) => {
    console.log(store.enemyBoard)

    this.rendered.forEach(el => {
      el.update(store)
    })
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
