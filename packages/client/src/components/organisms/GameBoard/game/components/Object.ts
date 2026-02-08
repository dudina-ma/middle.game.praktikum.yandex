export type coordsType = {
  x: number
  y: number
}

export interface IBaseElement {
  position: coordsType
  ctx: CanvasRenderingContext2D
  size?: coordsType
  imageSrc?: string
  color?: string
}

export class BaseElement {
  position: coordsType
  ctx: CanvasRenderingContext2D
  size: coordsType = { x: 0, y: 0 }
  image: HTMLImageElement = new Image()
  constructor({ position, ctx, imageSrc }: IBaseElement) {
    this.position = position
    this.ctx = ctx
    this.image.src = imageSrc || '/assets/Placeholder.png'
  }

  async init() {
    this.image.onload = () => {
      this.size = { x: this.image.width, y: this.image.height }
      return Promise.resolve()
    }
  }

  draw() {
    this.ctx.drawImage(this.image, this.position.x, this.position.y)
  }

  render(_?: unknown) {
    this.draw()
  }
}
