import { coordsType, IGameStore } from '../../../core/Types'
import { GAME_CONFIG } from '../../../GameConfig'

export interface IAbstractElement {
  position: coordsType
  ctx: CanvasRenderingContext2D
  size?: coordsType
  store: IGameStore
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

  update(_store: IGameStore): unknown {
    return false
  }

  render() {
    throw new Error(`render компонента ${this} не инициализирован`)
  }
}
