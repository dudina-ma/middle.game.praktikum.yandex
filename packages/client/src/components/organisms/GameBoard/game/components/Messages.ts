import { store } from '../core/Store'
import { BaseElement } from './Object'

export class Messages extends BaseElement {
  render(): void {
    const { x, y } = this.position
    const { message } = store.getStore()
    this.ctx.fillStyle = 'white'
    this.ctx.font = '17px consolas'
    this.ctx.fillText(message, x, y)
  }
}
