import { coordsType } from '../../../core/Types'
import { AbstractElement, IAbstractElement } from './AbstractElement'

export interface ISprite extends IAbstractElement {
  imageSrc: string
}

export class Sprite extends AbstractElement {
  size: coordsType = { x: 0, y: 0 }
  image: HTMLImageElement = new Image()
  constructor(props: ISprite) {
    super(props)
    const { imageSrc } = props
    this.image.src = imageSrc
  }

  render() {
    this.ctx.drawImage(this.image, this.position.x, this.position.y)
  }
}
