export function validatePlacement(
  board: string[][],
  x: number,
  y: number,
  length: number,
  direction: 'row' | 'column'
): boolean {
  if (x < 0 || y < 0) return false
  if (direction === 'row' && x + length > 10) return false
  if (direction === 'column' && y + length > 10) return false

  for (let i = -1; i <= length; i++) {
    for (let j = -1; j <= 1; j++) {
      const checkX = direction === 'row' ? x + i : x + j
      const checkY = direction === 'row' ? y + j : y + i

      if (checkX >= 0 && checkX < 10 && checkY >= 0 && checkY < 10) {
        if (board[checkY][checkX] !== 'empty') {
          return false
        }
      }
    }
  }

  return true
}
