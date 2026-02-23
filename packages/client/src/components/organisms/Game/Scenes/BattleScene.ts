import { GAME_CONFIG } from './../GameConfig'
import { IGameState, InputActions } from './../core/Types'
import { Store } from '../core/Store'
import { coordsType } from '../core/Types'
import { EnemyAI } from '../utils/EnemyAI'
import { abstractController } from '../components/ui/shared/AbstractController'

type Timer = ReturnType<typeof setTimeout>

export class BattleScene extends abstractController {
  private aiThinking = false
  private timeout: Timer | null = null
  private state: IGameState
  private isDestroyed = false

  constructor(private store: Store) {
    super()
    this.state = store.getState()
    store.on('update', this.update)
  }

  private update = (state: IGameState) => {
    this.state = state
    if (
      state.currentTurn === 'enemy' &&
      !this.aiThinking &&
      !this.isDestroyed
    ) {
      this.handleEnemyTurn()
    }
  }

  inputHandler(action: InputActions) {
    if (action.type === 'LEFT_CLICK') {
      const { x, y } = action
      this.handlePlayerTurn({ x, y })
    }
  }

  private async handleEnemyTurn() {
    this.aiThinking = true

    await new Promise(res => {
      this.timeout = setTimeout(res, GAME_CONFIG.AI_THINKING)
    })
    if (this.isDestroyed) return
    this.aiThinking = false
    const { x, y } = EnemyAI()
    this.store.dispatch({ type: 'FIRE_SHOT', target: 'player', x, y })
  }

  private async handlePlayerTurn(coords: coordsType) {
    if (this.state.currentTurn === 'player') {
      const { x, y } = coords
      this.store.dispatch({ type: 'FIRE_SHOT', target: 'enemy', x, y })
    }
  }

  destroy(): void {
    if (this.timeout) clearTimeout(this.timeout)
    this.isDestroyed = true
    this.store.off('update', this.update)
  }
}
