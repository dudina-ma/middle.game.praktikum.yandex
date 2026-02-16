import { cellType, coordsType } from '../core/Types'
import { getRandomInt } from './Math'

export class EnemyAI {
  getNextShot(_?: cellType[][]): coordsType {
    return { x: getRandomInt(0, 9), y: getRandomInt(0, 9) }
  }
}
