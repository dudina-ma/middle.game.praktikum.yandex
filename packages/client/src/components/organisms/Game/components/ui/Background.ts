import { GAME_CONFIG } from '../../GameConfig'
import { IAbstractElement } from './shared/AbstractElement'
import { Sprite } from './shared/Sprite'

export class Background extends Sprite {
  constructor(prosp: IAbstractElement) {
    super({ ...prosp, imageSrc: GAME_CONFIG.background })
  }
}
