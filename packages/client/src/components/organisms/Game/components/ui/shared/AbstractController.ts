import { IGameState, InputActions } from './../../../core/Types'
export class abstractController {
  init(_: unknown) {
    return false
  }
  update(_state: IGameState) {
    //
  }
  inputHandler(_inputAction: InputActions) {
    //
  }
  destroy() {
    throw new Error(`В компоненте ${this} не проинициализирован метод destroy`)
  }
}
