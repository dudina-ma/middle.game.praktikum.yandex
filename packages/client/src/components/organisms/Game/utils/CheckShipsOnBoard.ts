import { cellType } from '../core/Types'

export const CheckShipsOnBoard = (board: cellType[][]) => {
  return board.some(el => el.some(el => el === 'ship'))
}
