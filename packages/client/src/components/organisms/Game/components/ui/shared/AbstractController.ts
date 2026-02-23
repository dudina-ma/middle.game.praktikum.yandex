import { InputActions } from './../../../core/Types'
export class abstractController {
  init(_: unknown) {
    return false
  }

  inputHandler(_inputAction: InputActions) {
    //
  }
  destroy() {
    throw new Error(`В компоненте ${this} не проинициализирован метод destroy`)
  }
}
