import { Background } from './../components/ui/Background'
import { Messages } from '../components/ui/Messages'
import { Board } from '../components/ui/Board'
import type { GAME_CONFIG } from '../GameConfig'
import { preloadShipImages } from '../utils/PreloadShipImages'
import { Store } from './Store'
import { AbstractElement } from '../components/ui/shared/AbstractElement'
import { IGameState, onFinishData } from './Types'
import { GameController } from './GameController'

export type TonFinish = (data: onFinishData) => unknown | void

export class Game {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private rendered: AbstractElement[]
  private interval: number
  private lastTime = 0
  private gameController: GameController
  private frame = 0
  private store = new Store()
  private onFinish: TonFinish
  private state: IGameState

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
    this.state = this.store.getState()
    this.rendered = [
      new Background({
        position: { x: 0, y: 0 },
        config,
        store: this.state,
        ctx: this.ctx,
      }),
      new Messages({
        ctx: this.ctx,
        position: config.MESSAGES_POSITION,
        config,
        store: this.state,
      }),
      new Board({
        position: config.BOARDS_POSITION.ENEMY_BOARD_POSITION,
        ctx: this.ctx,
        boardType: 'enemy',
        config,
        store: this.state,
      }),

      new Board({
        position: config.BOARDS_POSITION.PLAYER_BOARD_POSITION,
        ctx: this.ctx,
        boardType: 'player',
        config,
        store: this.state,
      }),
    ]

    this.store.on('update', this.update)
    preloadShipImages(config.shipSprites, config.hitSprite)

    this.gameController = new GameController(
      this.store,
      this.canvas,
      config,
      this.onFinish
    )
  }

  private update = (state: IGameState) => {
    this.rendered.forEach(el => {
      el.update(state)
    })
    this.state = state
  }

  private finishGame = (data: onFinishData) => {
    this.destroy()
    this.onFinish(data)
  }

  public destroy() {
    cancelAnimationFrame(this.frame)
    this.store.off('update', this.update)
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
