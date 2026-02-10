export class abstractController {
  init(_: unknown) {
    return false
  }
  destroy() {
    throw new Error(`В компоненте ${this} не проинициализирован метод destroy`)
  }
}
