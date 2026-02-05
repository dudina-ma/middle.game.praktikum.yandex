import type { Board } from '../components/Board'
import type { BaseElement, coordsType } from '../components/Object'

export function checkClick(coords: coordsType, obj2: BaseElement): boolean {
  return (
    coords.x < obj2.position.x + obj2.size.x &&
    coords.x > obj2.position.x &&
    coords.y < obj2.position.y + obj2.size.y &&
    coords.y > obj2.position.y
  )
}

export function coordsToCell({ x, y }: coordsType, board: Board) {
  const { x: offcetX, y: offcetY } = board.position
  const { x: BoardSizeX, y: BoardSizeY } = board.size
  const cellSizeX = BoardSizeX / 10
  const cellSizeY = BoardSizeY / 10

  const cellX = Math.floor((x - offcetX) / cellSizeX)
  const cellY = Math.floor((y - offcetY) / cellSizeY)
  return { x: cellX, y: cellY }
}
