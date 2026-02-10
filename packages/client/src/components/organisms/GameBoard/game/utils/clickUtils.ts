import type { coordsType } from '../components/shared/Sprite'

export function checkClick(
  coords: coordsType,
  boardCoords: { x: number; y: number; w: number; h: number }
): boolean {
  return (
    coords.x < boardCoords.x + boardCoords.w &&
    coords.x > boardCoords.x &&
    coords.y < boardCoords.y + boardCoords.h &&
    coords.y > boardCoords.y
  )
}

export function coordsToCell(
  { x, y }: coordsType,
  boardCoords: { x: number; y: number; w: number; h: number }
) {
  const { x: offcetX, y: offcetY } = boardCoords
  const { w: BoardSizeX, h: BoardSizeY } = boardCoords
  const cellSizeX = BoardSizeX / 10
  const cellSizeY = BoardSizeY / 10

  const cellX = Math.floor((x - offcetX) / cellSizeX)
  const cellY = Math.floor((y - offcetY) / cellSizeY)
  return { x: cellX, y: cellY }
}
