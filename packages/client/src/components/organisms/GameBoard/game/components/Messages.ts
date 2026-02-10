import { store } from '../core/Store'
import { AbstractElement } from './shared/abstractComponents/AbstractElement'

export class Messages extends AbstractElement {
  render(): void {
    const { x, y } = this.position
    const { message } = store.getStore()
    this.ctx.fillStyle = 'red'
    this.ctx.font = '17px consolas'
    this.ctx.fillText(message, x, y)
  }
}
