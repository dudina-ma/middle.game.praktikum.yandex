import { BaseElement, type coordsType, type IBaseElement } from './Object'

interface bulletProps extends IBaseElement {
  end: coordsType
  onComplite?: () => void
}

export class Bullet extends BaseElement {
  private progress = 0
  private speed = 0.02
  private end: coordsType
  private start: coordsType
  public onComplete: (() => void) | null

  constructor(props: bulletProps) {
    super(props)
    const { end, onComplite } = props
    this.start = { ...props.position }
    this.end = end
    this.onComplete = onComplite || null
  }

  update() {
    this.progress += this.speed
    if (this.progress >= 1 && this.onComplete) {
      this.progress = 1
      this.onComplete!()
      this.onComplete = null
    }
  }

  draw() {
    const x = this.start.x + (this.end.x - this.start.x) * this.progress
    const y = this.start.y + (this.end.y - this.start.y) * this.progress

    this.ctx.beginPath()
    this.ctx.arc(x, y, 5, 0, Math.PI * 2)
    this.ctx.fillStyle = 'orange'
    this.ctx.fill()
    this.ctx.closePath()
    this.update()
  }

  public async wait(): Promise<void> {
    return new Promise(resolve => {
      const check = () => {
        if (this.isFinished) {
          resolve()
        } else {
          requestAnimationFrame(check)
        }
      }
      check()
    })
  }

  get isFinished() {
    return this.progress >= 1
  }
}
