import { IGameState } from './../../core/Types'
import { AbstractElement } from './shared/AbstractElement'

export class Messages extends AbstractElement {
  private message = ''
  update(state: IGameState) {
    this.message = state.message
  }
  render(): void {
    const { x, y } = this.position
    this.ctx.fillStyle = 'red'
    this.ctx.font = '17px consolas'
    this.ctx.fillText(this.message, x, y)
  }
}
