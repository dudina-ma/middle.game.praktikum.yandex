import { EnemyAI } from './../components/EnemyAI'
import type { coordsType } from '../components/shared/Sprite'
import { checkClick, coordsToCell } from '../utils/clickUtils'
import { fireShot } from '../utils/fireShot'
import { validatePlacement } from '../utils/ValidateShip'
import { store } from './Store'
import { PhaseHandlers } from '../utils/PhaseHandlers'
import { GAME_CONFIG } from '../GameConfig'

export class GameController {
  config: typeof GAME_CONFIG

  enemyAI = new EnemyAI()

  constructor(config: typeof GAME_CONFIG) {
    this.config = config
  }
  init = () => {
    document.addEventListener('mousedown', this.handleMouseDown)
  }

  private handleMouseDown = (e: MouseEvent) => {
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

    const { shipsToPlace, playerBoard } = store.getStore()
    const currentShip = shipsToPlace[0]

    if (validatePlacement(playerBoard, x, y, currentShip, 'row')) {
      const newBoard = playerBoard.map(row => [...row])
      const shipCoord = Array(currentShip)
        .fill(0)
        .map((_, i) => {
          return { x: x + i, y: y }
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
    document.removeEventListener('mousedown', this.handleMouseDown)
  }
}
