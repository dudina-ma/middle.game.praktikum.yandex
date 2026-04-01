const globalForTests = globalThis as typeof globalThis & {
  __EXTERNAL_SERVER_URL__: string
  __INTERNAL_SERVER_URL__: string
  __CLIENT_URL__: string
}

globalForTests.__EXTERNAL_SERVER_URL__ = 'http://localhost:3001'
globalForTests.__INTERNAL_SERVER_URL__ = 'http://localhost:3001'
globalForTests.__CLIENT_URL__ = 'http://localhost:3000'

export {}

class ResizeObserver {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  observe() {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  unobserve() {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  disconnect() {}
}

global.ResizeObserver = ResizeObserver
