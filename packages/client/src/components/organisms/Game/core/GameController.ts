import { InputManager } from './InputManager'
import { abstractController } from '../components/ui/shared/AbstractController'
import { Store } from './Store'
import { GAME_CONFIG } from '../GameConfig'
import { cellType, GamePhase, IGameState, InputActions } from './Types'
import { ScenesScheme } from '../Scenes/ScenesScheme'
import { CheckShipsOnBoard } from '../utils/CheckShipsOnBoard'

export class GameController extends abstractController {
  private curentScene: abstractController
  private inputManager: InputManager
  private gamePhase: GamePhase
  private state: IGameState
  constructor(
    private store: Store,
    private canvas: HTMLCanvasElement,
    private config: typeof GAME_CONFIG,
    private finishGame:
      | ((data: { score: number; result: 'win' | 'lose' }) => void | unknown)
      | null
  ) {
    super()
    this.inputManager = new InputManager(canvas, this.inputCallback, config)
    this.state = this.store.getState()
    this.gamePhase = this.state.phase
    this.curentScene = new ScenesScheme[this.gamePhase](store)
    this.store.on('update', this.update)
  }

  private update = (state: IGameState) => {
    this.state = state
    if (this.gamePhase !== state.phase) {
      this.gamePhase = state.phase
      this.curentScene.destroy()
      this.curentScene = new ScenesScheme[this.gamePhase](this.store)
    }
    this.phaseHandler(state)
    if (this.gamePhase === 'BATTLE') {
      this.checkWinner(state.playerBoard, state.enemyBoard)
    }
  }

  private inputCallback = (action: InputActions) => {
    this.curentScene.inputHandler(action)
  }

  private phaseHandler(state: IGameState) {
    const { shipsToPlace, phase } = state
    if (phase === 'SETUP' && shipsToPlace.length === 0) {
      this.store.dispatch({ type: 'SET_PHASE', phase: 'BATTLE' })
    }
  }

  destroy(): void {
    this.store.off('update', this.update)
    this.inputManager.destroy()
    this.curentScene.destroy()
    this.finishGame = null
  }

  private checkWinner(playerBoard: cellType[][], enemyBoard: cellType[][]) {
    const { score } = this.state
    if (!CheckShipsOnBoard(playerBoard)) {
      this.finishGame!({ result: 'lose', score: 999 })
    }
    if (!CheckShipsOnBoard(enemyBoard)) {
      this.finishGame!({ result: 'win', score })
    }
  }
}
