export class EventBus<T extends Record<string, unknown[]>> {
  private listeners: { [K in keyof T]?: ((...args: T[K]) => void)[] } = {}

  on<K extends keyof T>(event: K, callback: (...args: T[K]) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event]!.push(callback)
  }

  off<K extends keyof T>(event: K, callback: (...args: T[K]) => void) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${String(event)}`)
    }
    this.listeners[event] = this.listeners[event]!.filter(
      listener => listener !== callback
    )
  }

  emit<K extends keyof T>(event: K, ...args: T[K]) {
    if (!this.listeners[event]) {
      return
    }
    this.listeners[event]!.forEach(listener => listener(...args))
  }
}
