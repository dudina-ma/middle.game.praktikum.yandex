import type { cellType } from '../core/Store'
import { getRandomInt } from './Math'
import { validatePlacement } from './ValidateShip'

export const createEnemyShips = (shipsToPlace: number[]) => {
  const board: cellType[][] = Array(10)
    .fill(null)
    .map(() => Array(10).fill('empty'))

  shipsToPlace.forEach(length => {
    let placed = false
    let attempts = 0

    while (!placed && attempts < 500) {
      const direction = Math.random() > 0.5 ? 'row' : 'column'
      const x = getRandomInt(0, 9)
      const y = getRandomInt(0, 9)

      if (validatePlacement(board, x, y, length, direction)) {
        for (let i = 0; i < length; i++) {
          const curX = direction === 'row' ? x + i : x
          const curY = direction === 'row' ? y : y + i
          board[curY][curX] = 'ship'
        }
        placed = true
      }
      attempts++
    }
  })

  return board
}
