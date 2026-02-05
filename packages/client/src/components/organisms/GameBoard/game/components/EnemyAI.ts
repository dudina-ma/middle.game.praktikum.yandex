import type { cellType } from '../core/Store'
import { getRandomInt } from '../utils/Math'
import type { coordsType } from './Object'

export class EnemyAI {
  getNextShot(_?: cellType[][]): coordsType {
    return { x: getRandomInt(0, 9), y: getRandomInt(0, 9) }
  }
}
