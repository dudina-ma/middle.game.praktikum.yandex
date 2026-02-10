import { GameStore } from './../core/Store'
import { type cellType } from '../core/Store'
import { GAME_CONFIG } from '../GameConfig'
import {
  AbstractElement,
  IAbstractElement,
} from './shared/abstractComponents/AbstractElement'

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
  boardType: TBoardType

  constructor({ position, ctx, size, boardType, config, store }: BoardProps) {
    super({ position, ctx, size, config, store })
    this.colors = config?.colors
    this.position = position
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

  public update = ({ enemyBoard, playerBoard }: GameStore) => {
    this.board = this.boardType === 'enemy' ? enemyBoard : playerBoard
  }

  render() {
    this.board.forEach((el, row) => {
      el.forEach((cell, column) => {
        this.ctx.fillStyle = this.colors[cell]
        this.ctx.fillRect(
          this.position.x + (DIVIDER_W + CELL_SIZE.x) * column,
          this.position.y + (DIVIDER_W + CELL_SIZE.y) * row,
          CELL_SIZE.x,
          CELL_SIZE.y
        )
      })
    })
  }
}
