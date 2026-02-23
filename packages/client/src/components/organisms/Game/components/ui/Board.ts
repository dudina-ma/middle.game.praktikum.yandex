import { cellType, IGameState, selectedShip } from '../../core/Types'
import { GAME_CONFIG } from '../../GameConfig'
import { validatePlacement } from '../../utils/ValidateShip'
import { DetectedShip, detectShips } from '../../utils/DetectShips'
import { getHitImage, getShipImage } from '../../utils/PreloadShipImages'
import { AbstractElement, IAbstractElement } from './shared/AbstractElement'

const { DIVIDER_W, CELL_SIZE } = GAME_CONFIG

type TBoardType = 'player' | 'enemy'

interface BoardProps extends IAbstractElement {
  boardType: TBoardType
}

export class Board extends AbstractElement {
  private board: cellType[][]
  private colors
  private selectedShip: selectedShip | null = null
  private boardType: TBoardType
  private isActive = false
  private ships: DetectedShip[] = []

  constructor({ position, ctx, size, boardType, config, store }: BoardProps) {
    super({ position, ctx, size, config, store })
    this.colors = config?.colors
    this.board = boardType === 'enemy' ? store?.enemyBoard : store?.playerBoard
    this.boardType = boardType
    this.size = this.calculateSize()
  }

  private _getDrawPosition = (cellX: number, cellY: number) => {
    return {
      drawX: this.position.x + (DIVIDER_W + CELL_SIZE.x) * cellX,
      drawY: this.position.y + (DIVIDER_W + CELL_SIZE.y) * cellY,
    }
  }

  private calculateSize() {
    return {
      x: (CELL_SIZE.x + DIVIDER_W) * this.board.length,
      y: (CELL_SIZE.y + DIVIDER_W) * this.board.length,
    }
  }

  public update = ({
    enemyBoard,
    playerBoard,
    selectedShip,
    currentTurn,
    phase,
  }: IGameState) => {
    this.board = this.boardType === 'enemy' ? enemyBoard : playerBoard
    this.isActive = phase === 'BATTLE' && currentTurn !== this.boardType
    console.log(phase, currentTurn, this.boardType)
    this.selectedShip = selectedShip
  }

  private drawOverlay() {
    if (!this.selectedShip) return

    const { coords, length, direction } = this.selectedShip
    const { x: cellX, y: cellY } = coords
    const isValid = validatePlacement(
      this.board,
      cellX,
      cellY,
      length,
      direction
    )

    const img = getShipImage(length)
    if (img && img.complete) {
      this.ctx.save()
      this.ctx.globalAlpha = isValid ? 0.6 : 0.4
      this.drawShipSprite(img, cellX, cellY, length, direction)
      this.ctx.globalAlpha = 1
      this.ctx.lineWidth = 2
      this.ctx.strokeStyle = isValid
        ? 'rgba(0, 255, 0, 0.8)'
        : 'rgba(255, 21, 0, 0.8)'

      const { drawX, drawY } = this._getDrawPosition(cellX, cellY)
      const w =
        direction === 'row'
          ? CELL_SIZE.x * length + DIVIDER_W * (length - 1)
          : CELL_SIZE.x
      const h =
        direction === 'column'
          ? CELL_SIZE.y * length + DIVIDER_W * (length - 1)
          : CELL_SIZE.y
      this.ctx.strokeRect(drawX, drawY, w, h)
      this.ctx.restore()
    } else {
      this.ctx.lineWidth = 2
      if (isValid) {
        this.ctx.fillStyle = 'rgba(0, 255, 0, 0.3)'
        this.ctx.strokeStyle = 'rgba(0, 255, 0, 0.8)'
      } else {
        this.ctx.fillStyle = 'rgba(237, 8, 4, 0.3)'
        this.ctx.strokeStyle = 'rgba(255, 21, 0, 0.8)'
      }
      for (let i = 0; i < length; i++) {
        const currentX = direction === 'row' ? cellX + i : cellX
        const currentY = direction === 'column' ? cellY + i : cellY

        if (currentX < this.size.x && currentY < this.size.y) {
          const { drawX, drawY } = this._getDrawPosition(currentX, currentY)
          this.ctx.fillRect(drawX, drawY, CELL_SIZE.x, CELL_SIZE.y)
          this.ctx.strokeRect(drawX, drawY, CELL_SIZE.x, CELL_SIZE.y)
        }
      }
    }
  }

  private drawBoard() {
    this.board.forEach((el, row) => {
      el.forEach((cell, column) => {
        this.ctx.fillStyle =
          cell === 'ship' ? this.colors.empty : this.colors[cell]

        const { drawX, drawY } = this._getDrawPosition(column, row)
        this.ctx.fillRect(drawX, drawY, CELL_SIZE.x, CELL_SIZE.y)
      })
    })
  }

  private drawHitSprite(cellX: number, cellY: number) {
    const hitImg = getHitImage()
    const { drawX, drawY } = this._getDrawPosition(cellX, cellY)
    if (hitImg?.complete) {
      this.ctx.drawImage(
        hitImg,
        0,
        0,
        hitImg.naturalWidth,
        hitImg.naturalHeight,
        drawX,
        drawY,
        CELL_SIZE.x,
        CELL_SIZE.y
      )
    } else {
      this.ctx.fillStyle = this.colors.hited
      this.ctx.fillRect(drawX, drawY, CELL_SIZE.x, CELL_SIZE.y)
    }
  }

  private drawShipSprite(
    img: HTMLImageElement,
    shipX: number,
    shipY: number,
    length: number,
    direction: 'row' | 'column'
  ) {
    const { drawX, drawY } = this._getDrawPosition(shipX, shipY)
    const width =
      direction === 'row'
        ? CELL_SIZE.x * length + DIVIDER_W * (length - 1)
        : CELL_SIZE.x
    const height =
      direction === 'column'
        ? CELL_SIZE.y * length + DIVIDER_W * (length - 1)
        : CELL_SIZE.y

    this.ctx.save()
    this.ctx.fillStyle = this.colors.busy

    if (direction === 'row') {
      this.ctx.drawImage(
        img,
        0,
        0,
        img.naturalWidth,
        img.naturalHeight,
        drawX,
        drawY,
        width,
        height
      )
      this.ctx.fillRect(drawX, drawY, width, height)
    } else {
      this.ctx.fillRect(drawX, drawY, width, height)
      this.ctx.translate(drawX + width / 2, drawY + height / 2)
      this.ctx.rotate(Math.PI / 2)
      // ?
      this.ctx.drawImage(
        img,
        0,
        0,
        img.naturalWidth,
        img.naturalHeight,
        -height / 2,
        -width / 2,
        height,
        width
      )
    }
    this.ctx.restore()
  }

  private drawHitSprites() {
    this.board.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 'hited') this.drawHitSprite(x, y)
      })
    })
  }

  private drawCell(ship: DetectedShip) {
    for (let i = 0; i < ship.length; i++) {
      const cx = ship.direction === 'row' ? ship.x + i : ship.x
      const cy = ship.direction === 'column' ? ship.y + i : ship.y
      this.ctx.fillStyle =
        this.board[cy][cx] === 'hited' ? this.colors.hited : this.colors.empty
      this.ctx.fillRect(
        this.position.x + (DIVIDER_W + CELL_SIZE.x) * cx,
        this.position.y + (DIVIDER_W + CELL_SIZE.y) * cy,
        CELL_SIZE.x,
        CELL_SIZE.y
      )
    }
  }

  private drawShipSprites() {
    if (this.boardType !== 'player') return

    if (this.ships.length < GAME_CONFIG.SHIPS_TO_PLACE.length) {
      this.ships = detectShips(this.board)
    }

    this.ships.forEach(ship => {
      const img = getShipImage(ship.length)

      if (img && img.complete) {
        this.drawShipSprite(img, ship.x, ship.y, ship.length, ship.direction)
        return
      }

      this.drawCell(ship)
    })
  }

  private drawActive() {
    const padding = 5
    this.ctx.strokeStyle = 'rgba(0, 255, 0, 1)'
    this.ctx.strokeRect(
      this.position.x - padding,
      this.position.y - padding,
      this.size.x + padding * 2,
      this.size.y + padding * 2
    )
  }

  render() {
    this.drawBoard()
    if (this.isActive) {
      this.drawActive()
    }
    if (this.boardType === 'player') {
      this.drawShipSprites()
      this.drawOverlay()
    }
    this.drawHitSprites()
  }
}
