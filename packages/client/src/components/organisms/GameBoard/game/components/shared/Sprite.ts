import {
  AbstractElement,
  IAbstractElement,
} from './abstractComponents/AbstractElement'

export type coordsType = {
  x: number
  y: number
}

export interface ISprite extends IAbstractElement {
  imageSrc?: string
}

export class Sprite extends AbstractElement {
  size: coordsType = { x: 0, y: 0 }
  image: HTMLImageElement = new Image()
  constructor(props: ISprite) {
    super(props)
    const { imageSrc } = props
    this.image.src = imageSrc || '/assets/Placeholder.png'
  }

  render() {
    this.ctx.drawImage(this.image, this.position.x, this.position.y)
  }
}
