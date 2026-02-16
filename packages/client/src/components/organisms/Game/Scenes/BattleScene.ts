import { IGameState, InputActions } from './../core/Types'
import { Store } from '../core/Store'
import { coordsType } from '../core/Types'
import { EnemyAI } from '../utils/EnemyAI'
import { abstractController } from '../components/ui/shared/AbstractController'

export class BattleScene extends abstractController {
  private aiThinking = false

  constructor(private store: Store, private abortSignal: AbortSignal) {
    super()
  }

  update(state: IGameState) {
    if (state.currentTurn === 'ENEMY' && !this.aiThinking) {
      this.handleEnemyTurn()
    }
  }

  inputHandler(action: InputActions) {
    if (action.type === 'LEFT_CLICK' && !this.aiThinking) {
      const { x, y } = action
      this.handlePlayerTurn({ x, y })
    }
  }

  private async handleEnemyTurn() {
    this.aiThinking = true

    try {
      await new Promise((res, rej) => {
        const timeout = setTimeout(res, 800)
        this.abortSignal.addEventListener('abort', () => {
          clearTimeout(timeout)
          rej(new Error('Aborted'))
        })
      })

      const { x, y } = EnemyAI()

      this.store.dispatch({ type: 'FIRE_SHOT', target: 'PLAYER', x, y })
    } catch (e) {
      // Игнорируем ошибку отмены
    } finally {
      this.aiThinking = false
    }
  }
  private async handlePlayerTurn(coords: coordsType) {
    const { x, y } = coords

    this.store.dispatch({ type: 'FIRE_SHOT', target: 'ENEMY', x, y })
  }
}
