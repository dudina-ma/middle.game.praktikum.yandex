import { GameStore } from '../../../core/Store'
import { GAME_CONFIG } from '../../../GameConfig'

export type coordsType = {
  x: number
  y: number
}

export interface IAbstractElement {
  position: coordsType
  ctx: CanvasRenderingContext2D
  size?: coordsType
  store: GameStore
  config: typeof GAME_CONFIG
}

export class AbstractElement {
  position: coordsType
  ctx: CanvasRenderingContext2D
  size: coordsType = { x: 0, y: 0 }
  constructor({ position, ctx }: IAbstractElement) {
    this.position = position
    this.ctx = ctx
  }

  update(store: GameStore): unknown {
    return false
  }

  render() {
    throw new Error(`render компонента ${this} не инициализирован`)
  }
}
