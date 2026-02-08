import type { coordsType } from '../components/Object'
import type { cellType } from '../core/Store'

export const fireShot = (
  cellCoords: coordsType,
  board: cellType[][]
): { board: cellType[][]; result: 'hit' | 'miss' | 'null' } => {
  const { x, y } = cellCoords
  board = board.map(row => [...row])
  const cellState = board[y][x]

  if (cellState === 'ship') {
    board[y][x] = 'hited'
    return { board, result: 'hit' }
  } else if (cellState === 'empty') {
    board[y][x] = 'miss'
    return { board, result: 'miss' }
  } else {
    return { board, result: 'null' }
  }
}
