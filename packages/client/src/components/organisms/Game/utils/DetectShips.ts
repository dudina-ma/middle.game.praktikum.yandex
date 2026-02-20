import { cellType } from '../core/Types'

export type DetectedShip = {
  x: number
  y: number
  length: number
  direction: 'row' | 'column'
}

const isShipCell = (cell: cellType) => cell === 'ship' || cell === 'hited'

export const detectShips = (board: cellType[][]): DetectedShip[] => {
  const ships: DetectedShip[] = []
  const rows = board.length
  const cols = rows > 0 ? board[0].length : 0

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!isShipCell(board[row][col])) continue

      const isHead =
        (col === 0 || !isShipCell(board[row][col - 1])) &&
        (row === 0 || !isShipCell(board[row - 1][col]))

      if (!isHead) continue

      let length = 1
      let direction: 'row' | 'column' = 'row'

      // проверяем горизонталь
      if (col + 1 < cols && isShipCell(board[row][col + 1])) {
        direction = 'row'
        while (col + length < cols && isShipCell(board[row][col + length])) {
          length++
        }
      }
      // иначе проверяем вертикаль
      else if (row + 1 < rows && isShipCell(board[row + length][col])) {
        direction = 'column'
        while (row + length < rows && isShipCell(board[row + length][col])) {
          length++
        }
      }

      ships.push({ x: col, y: row, length, direction })
    }
  }

  return ships
}
