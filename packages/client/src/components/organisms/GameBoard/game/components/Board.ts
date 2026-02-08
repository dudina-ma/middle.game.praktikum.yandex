import { GameStore } from './../core/Store'
import { store, type cellType } from '../core/Store'
import { GAME_CONFIG } from '../GameConfig'
import { BaseElement, type IBaseElement } from './Object'

const { DIVIDER_W, CELL_SIZE } = GAME_CONFIG

type TBoardType = 'player' | 'enemy'

interface BoardProps extends IBaseElement {
  boardType: TBoardType
  board: cellType[][]
  colors: Record<cellType, string>
}

export class Board extends BaseElement {
  private board: cellType[][]
  private colors
  boardType: TBoardType

  constructor({ position, ctx, size, boardType, board, colors }: BoardProps) {
    super({ position, ctx, size })
    this.position = position
    this.board = board
    this.boardType = boardType
    this.colors = colors
    this.size = this.calculateSize()
    store.on('update', this.setBoard)
  }

  calculateSize() {
    return {
      x: (CELL_SIZE.x + DIVIDER_W) * this.board.length,
      y: (CELL_SIZE.y + DIVIDER_W) * this.board.length,
    }
  }

  private setBoard = ({ enemyBoard, playerBoard }: GameStore) => {
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
