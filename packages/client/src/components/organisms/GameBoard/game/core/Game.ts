import { Background } from '../components/Background'
import { Messages } from '../components/Messages'
import { Board } from '../components/Board'
import { GameController } from './GameController'
import type { GAME_CONFIG } from '../GameConfig'
import { store } from './Store'
import { Bullet } from '../components/Bullet'
import { BaseObject } from 'styled-components/dist/types'
// import type { Bullet } from '../components/Bullet'

export class Game {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private rendered: BaseObject[]
  private backgrounds: Background[] = []
  private messages: Messages
  private playerBoard: Board
  private enemyBoard: Board
  private interval: number
  private lastTime = 0
  private gameController: GameController
  private effects: Bullet[] = []
  private isRender = true
  private frame = 0

  constructor(canvas: HTMLCanvasElement, config: typeof GAME_CONFIG) {
    this.interval = 1000 / config.FPS
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')!
    this.canvas.width = config.CANVAS_SIZE.x
    this.canvas.height = config.CANVAS_SIZE.y
    this.messages = new Messages({
      ctx: this.ctx,
      position: config.MESSAGES_POSITION,
    })
    const { playerBoard, enemyBoard } = store.getStore()
    this.rendered = []

    this.playerBoard = new Board({
      position: config.PLAYER_BOARD_POSITION,
      ctx: this.ctx,
      boardType: 'player',
      board: playerBoard,
      colors: config.colors,
    })
    this.enemyBoard = new Board({
      position: config.ENEMY_BOARD_POSITION,
      ctx: this.ctx,
      boardType: 'enemy',
      board: enemyBoard,
      colors: { ...config.colors, ship: config.colors.empty },
    })

    this.gameController = new GameController(
      this.playerBoard,
      this.enemyBoard,
      this
    )
    this.gameController.init()
  }

  public destroy() {
    cancelAnimationFrame(this.frame)
    this.gameController.destroy()
    this.isRender = false
  }

  addEffect(effect: Bullet) {
    this.effects.push(effect)
  }

  public render(currentTime = 0) {
    this.frame = requestAnimationFrame(time => this.render(time))
    const deltaTime = currentTime - this.lastTime

    if (deltaTime > this.interval) {
      this.lastTime = currentTime - (deltaTime % this.interval)
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      // this.backgrounds.forEach(bg => bg.render())
      this.messages.render()
      this.playerBoard.render()
      this.enemyBoard.render()

      this.effects = this.effects.filter(effect => {
        effect.render()

        return !effect.isFinished
      })
    }
  }
}
