import { BaseElement, type IBaseElement } from './Object'

interface BackgroundProps extends IBaseElement {
  speed: number
}

export class Background extends BaseElement {
  speed: number
  constructor(props: BackgroundProps) {
    super(props)
    this.speed = props.speed
  }
}
