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
  size: coordsType
  canvaseSize: coordsType
  start: coordsType
  image: HTMLImageElement = new Image()
  type: 'sprite' | 'canvas'
  color: string
  constructor({ position, ctx, imageSrc, size, color }: IBaseElement) {
    this.position = position
    this.ctx = ctx
    this.color = color || 'ffffff'
    this.size = size || { x: 10, y: 10 }
    imageSrc ? (this.type = 'sprite') : (this.type = 'canvas')
    if (this.type === 'sprite') {
      this.image.src = imageSrc || '/assets/Placeholder.png'
      this.size = { x: 0, y: 0 }
      this.image.onload = () => {
        this.size = { x: this.image.width, y: this.image.height }
      }
    }

    this.canvaseSize = { x: this.ctx.lineWidth, y: this.ctx.lineDashOffset }
    this.start = position
  }

  draw() {
    if (this.type === 'sprite') {
      this.ctx.drawImage(this.image, this.position.x, this.position.y)
    } else {
      const { x, y } = this.position
      const w = this.size.x
      const h = this.size.y
      this.ctx.fillStyle = this.color
      this.ctx.lineWidth = 2 // Толщина линии
      // this.ctx.strokeRect(x, y, w, h);
      this.ctx.fillRect(x, y, w, h)
    }
  }

  render(_?: unknown) {
    this.draw()
  }
}
