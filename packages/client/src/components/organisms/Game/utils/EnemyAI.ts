import { cellType, coordsType } from '../core/Types'
import { getRandomInt } from './Math'

export const EnemyAI = (_board?: cellType[][]): coordsType => {
  return { x: getRandomInt(0, 9), y: getRandomInt(0, 9) }
}
