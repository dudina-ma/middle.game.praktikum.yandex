import { cellType } from '../core/Types'

export type DetectedShip = {
  x: number
  y: number
  length: number
  direction: 'row' | 'column'
}

const isShipCell = (cell: cellType) => cell === 'ship' || cell === 'hited'

const isShipHeadCell = (board: cellType[][], col: number, row: number) => {
  return (
    (col === 0 || !isShipCell(board[row][col - 1])) &&
    (row === 0 || !isShipCell(board[row - 1][col]))
  )
}

export const detectShips = (board: cellType[][]): DetectedShip[] => {
  const ships: DetectedShip[] = []
  const rows = board.length
  const cols = board[0].length ?? 0

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cell = board[row]?.[col]
      if (!isShipCell(cell)) continue

      const isHead = isShipHeadCell(board, col, row)
      if (!isHead) continue

      let length = 1
      let direction: 'row' | 'column' = 'row'

      let dx = 0
      let dy = 0

      if (col + 1 < cols && isShipCell(board[row][col + 1])) {
        dx = 1
        direction = 'row'
      } else if (row + 1 < rows && isShipCell(board[row + 1][col])) {
        dy = 1
        direction = 'column'
      }

      if (dx || dy) {
        while (
          row + dy * length < rows &&
          col + dx * length < cols &&
          isShipCell(board[row + dy * length][col + dx * length])
        ) {
          length++
        }
      }

      ships.push({ x: col, y: row, length, direction })
    }
  }

  return ships
}
