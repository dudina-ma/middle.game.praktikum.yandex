import { EnemyAI } from '../utils/EnemyAI'
import type { coordsType } from '../components/ui/shared/Sprite'

import { validatePlacement } from '../utils/ValidateShip'
import { store } from './Store'
import { PhaseHandlers } from '../utils/PhaseHandlers'
import { GAME_CONFIG } from '../GameConfig'
import { checkClick, coordsToCell } from '../utils/clickUtils'
import { fireShot } from '../utils/fireShot'

export class GameController {
  config: typeof GAME_CONFIG
  ctx: HTMLCanvasElement
  enemyAI = new EnemyAI()

  constructor(config: typeof GAME_CONFIG, ctx: HTMLCanvasElement) {
    this.config = config
    this.ctx = ctx
  }
  init = () => {
    this.ctx.addEventListener('mousedown', this.handleMouseDown)
    this.ctx.addEventListener('mousemove', this.handleMouseMove)
    this.ctx.addEventListener('contextmenu', this.contextmenuHandler)
  }

  private contextmenuHandler(e: PointerEvent) {
    e.preventDefault()
  }

  private handleMouseDown = (e: MouseEvent) => {
    if (e.button === 2) {
      e.preventDefault()
      this.rotateShip()
      return
    }
    const { phase } = store.getStore()
    const { ENEMY_BOARD_POSITION, PLAYER_BOARD_POSITION } =
      this.config.BOARDS_POSITION
    const coords = { x: e.offsetX, y: e.offsetY }
    const boardCoords =
      phase === 'SETUP' ? PLAYER_BOARD_POSITION : ENEMY_BOARD_POSITION
    if (!checkClick(coords, boardCoords)) return
    const cell = coordsToCell(coords, boardCoords)
    PhaseHandlers[phase]?.(cell, this)
  }

  rotateShip() {
    const { selectedShip } = store.getStore()
    if (selectedShip) {
      const direction = selectedShip.direction === 'row' ? 'column' : 'row'
      store.setStore({ selectedShip: { ...selectedShip, direction } })
    }
  }

  private handleMouseMove = (e: MouseEvent) => {
    const { shipsToPlace, selectedShip } = store.getStore()
    const { PLAYER_BOARD_POSITION } = this.config.BOARDS_POSITION
    const coords = { x: e.offsetX, y: e.offsetY }
    const boardCoords = PLAYER_BOARD_POSITION
    if (!checkClick(coords, boardCoords)) return
    const cell = coordsToCell(coords, boardCoords)
    const currentShip = shipsToPlace[0]
    const direction = selectedShip?.direction || 'row'
    console.log(direction)

    store.setStore({
      selectedShip: { coords: cell, length: currentShip, direction },
    })
  }

  private async enemyHandler() {
    const board = store.getStore().playerBoard.map(row => [...row])
    const coors = this.enemyAI.getNextShot()
    await new Promise(res => setTimeout(res, 800))
    const { board: playerBoard, result } = fireShot(coors, board)
    store.setStore({ playerBoard })
    if (result === 'hit' || result === 'null') {
      this.enemyHandler()
    } else if (result === 'miss') {
      store.setStore({ currentTurn: 'PLAYER', message: 'Ваш ход' })
    }
  }

  public playerHandler(cellCoords: coordsType) {
    const board = store.getStore().enemyBoard.map(row => [...row])
    const { board: enemyBoard, result } = fireShot(cellCoords, board)
    store.setStore({ enemyBoard })
    if (result === 'miss') {
      store.setStore({ currentTurn: 'ENEMY', message: 'Ход противника' })
      this.enemyHandler()
    }
  }

  public placeShip = (cellCoords: coordsType) => {
    const { x, y } = cellCoords

    const { shipsToPlace, playerBoard, selectedShip } = store.getStore()
    const currentShip = shipsToPlace[0]
    const direction = selectedShip?.direction || 'row'

    if (validatePlacement(playerBoard, x, y, currentShip, direction)) {
      const newBoard = playerBoard.map(row => [...row])
      const shipCoord = Array(currentShip)
        .fill(0)
        .map((_, i) => {
          if (direction === 'row') {
            return { x: x + i, y: y }
          } else {
            return { x: x, y: y + i }
          }
        })
      shipCoord.forEach(({ x, y }) => {
        newBoard[y][x] = 'ship'
      })

      const newShipsToPlace = [...shipsToPlace.slice(1, shipsToPlace.length)]
      store.setStore({
        playerBoard: newBoard,
        shipsToPlace: newShipsToPlace,
        message: `Поставьте корабль длинной ${newShipsToPlace[0]} на поле`,
      })

      if (newShipsToPlace.length === 0) {
        store.setStore({ phase: 'BATTLE', message: 'Ваш ход' })
      }
    }
  }

  destroy = () => {
    this.ctx.removeEventListener('mousedown', this.handleMouseDown)
    this.ctx.removeEventListener('mousemove', this.handleMouseMove)
    this.ctx.removeEventListener('contextmenu', this.contextmenuHandler)
  }
}
