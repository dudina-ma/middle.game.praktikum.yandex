import { IGameState } from './../core/Types'
import { Store } from '../core/Store'
import { coordsType } from '../core/Types'
import { EnemyAI } from '../utils/EnemyAI'

export class BattleScene {
  private aiThinking = false

  constructor(private store: Store, private abortSignal: AbortSignal) {}

  update(state: IGameState) {
    if (state.currentTurn === 'ENEMY' && !this.aiThinking) {
      this.handleEnemyTurn()
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

      this.store.dispatch({ type: 'FIRE_SHOT', target: 'player', x, y })
    } catch (e) {
      // Игнорируем ошибку отмены
    } finally {
      this.aiThinking = false
    }
  }
  private async handlePlayerTurn(coords: coordsType) {
    const { x, y } = coords

    this.store.dispatch({ type: 'FIRE_SHOT', target: 'player', x, y })
  }
}
