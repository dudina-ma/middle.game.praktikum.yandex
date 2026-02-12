import { cellType, IGameStore, selectedShip } from '../../core/Types'
import { GAME_CONFIG } from '../../GameConfig'
import { validatePlacement } from '../../utils/ValidateShip'
import { AbstractElement, IAbstractElement } from './shared/AbstractElement'

const { DIVIDER_W, CELL_SIZE } = GAME_CONFIG

type TBoardType = 'player' | 'enemy'

interface BoardProps extends IAbstractElement {
  boardType: TBoardType
  // board: cellType[][]
  // colors: Record<cellType, string>
}

export class Board extends AbstractElement {
  private board: cellType[][]
  private colors
  private selectedShip: selectedShip | null = null
  private boardType: TBoardType

  constructor({ position, ctx, size, boardType, config, store }: BoardProps) {
    super({ position, ctx, size, config, store })
    this.colors = config?.colors
    this.board = boardType === 'enemy' ? store?.enemyBoard : store?.playerBoard
    this.boardType = boardType
    this.size = this.calculateSize()
  }

  private calculateSize() {
    return {
      x: (CELL_SIZE.x + DIVIDER_W) * this.board.length,
      y: (CELL_SIZE.y + DIVIDER_W) * this.board.length,
    }
  }

  public update = ({ enemyBoard, playerBoard, selectedShip }: IGameStore) => {
    this.board = this.boardType === 'enemy' ? enemyBoard : playerBoard
    this.selectedShip = selectedShip
  }

  private drawOverlay() {
    if (!this.selectedShip) return

    const { coords, length, direction } = this.selectedShip
    const { x: cellX, y: cellY } = coords
    this.ctx.lineWidth = 2

    if (validatePlacement(this.board, cellX, cellY, length, direction)) {
      this.ctx.fillStyle = 'rgba(0, 255, 0, 0.3)'
      this.ctx.strokeStyle = 'rgba(0, 255, 0, 0.8)'
    } else {
      this.ctx.fillStyle = 'rgba(237, 8, 4, 0.3)'
      this.ctx.strokeStyle = 'rgba(255, 21, 0, 0.8)'
    }

    for (let i = 0; i < length; i++) {
      const currentX = direction === 'row' ? cellX + i : cellX
      const currentY = direction === 'column' ? cellY + i : cellY

      if (currentX < 10 && currentY < 10) {
        const drawX = this.position.x + (DIVIDER_W + CELL_SIZE.x) * currentX
        const drawY = this.position.y + (DIVIDER_W + CELL_SIZE.y) * currentY

        this.ctx.fillRect(drawX, drawY, CELL_SIZE.x, CELL_SIZE.y)
        this.ctx.strokeRect(drawX, drawY, CELL_SIZE.x, CELL_SIZE.y)
      }
    }
  }

  private drawBoard() {
    this.board.forEach((el, row) => {
      el.forEach((cell, column) => {
        this.ctx.fillStyle = this.colors[cell]
        if (this.boardType === 'enemy' && cell === 'ship') {
          this.ctx.fillStyle = this.colors.empty
        }
        this.ctx.fillRect(
          this.position.x + (DIVIDER_W + CELL_SIZE.x) * column,
          this.position.y + (DIVIDER_W + CELL_SIZE.y) * row,
          CELL_SIZE.x,
          CELL_SIZE.y
        )
      })
    })
  }

  render() {
    this.drawBoard()
    if (this.boardType === 'player') {
      this.drawOverlay()
    }
  }
}
