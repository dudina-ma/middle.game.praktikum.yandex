import { IGameState, InputActions } from './../core/Types'
import { Store } from '../core/Store'

import { abstractController } from '../components/ui/shared/AbstractController'

export class BattleScene extends abstractController {
  private aiThinking = false

  constructor(private store: Store, private abortSignal: AbortSignal) {
    super()
  }

  update(_state: IGameState) {
    //
  }

  inputHandler(action: InputActions) {
    if (action.type === 'LEFT_CLICK') {
      const { x, y } = action
      this.store.dispatch({ type: 'PLACE_SHIP', x, y })
    } else if (action.type === 'RIGHT_CLICK') {
      this.store.dispatch({ type: 'ROTATE_SHIP' })
    }
  }
}
