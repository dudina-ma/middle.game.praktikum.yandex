import { EnemyAI } from './../components/EnemyAI'
import type { Board } from '../components/Board'
import type { coordsType } from '../components/Object'
import { checkClick, coordsToCell } from '../utils/clickUtils'
import { fireShot } from '../utils/fireShot'
import { validatePlacement } from '../utils/ValidateShip'
import { store } from './Store'
import { PhaseHandlers } from '../utils/PhaseHandlers'
import type { Game } from './Game'

export class GameController {
  store: typeof store
  playerBoard: Board
  enemyBoard: Board
  enemyAI = new EnemyAI()
  game: Game

  constructor(playerBoard: Board, enemyBoard: Board, game: Game) {
    this.store = store
    this.playerBoard = playerBoard
    this.enemyBoard = enemyBoard
    this.game = game
  }
  init = () => {
    document.addEventListener('mousedown', this.handleMouseDown)
  }

  private handleMouseDown = (e: MouseEvent) => {
    const { phase } = store.getStore()
    const coords = { x: e.offsetX, y: e.offsetY }
    const targetBoard = phase === 'SETUP' ? this.playerBoard : this.enemyBoard
    if (!checkClick(coords, targetBoard)) return
    const cell = coordsToCell(coords, targetBoard)
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
