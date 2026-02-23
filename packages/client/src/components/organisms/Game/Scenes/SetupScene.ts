import { coordsType, IGameState, InputActions } from './../core/Types'
import { Store } from '../core/Store'

import { abstractController } from '../components/ui/shared/AbstractController'

export class SetupScene extends abstractController {
  private state: IGameState

  constructor(private store: Store) {
    super()
    this.state = store.getState()
    store.on('update', this.update)
  }

  private update = (state: IGameState) => {
    this.state = state
  }

  inputHandler(action: InputActions) {
    if (action.type === 'LEFT_CLICK' && action.target === 'player') {
      const { x, y } = action
      this.store.dispatch({ type: 'PLACE_SHIP', x, y })
    } else if (action.type === 'RIGHT_CLICK') {
      this.store.dispatch({ type: 'ROTATE_SHIP' })
    } else if (action.type === 'MOUSE_MOVE') {
      this.moveSelectedShip(action)
    }
  }

  private moveSelectedShip(coords: coordsType) {
    const { x, y } = coords
    this.store.dispatch({ type: 'UPDATE_SELECTED_SHIP', x, y })
  }

  destroy(): void {
    this.store.off('update', this.update)
  }
}
