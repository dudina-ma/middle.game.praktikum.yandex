const globalForTests = globalThis as typeof globalThis & {
  __EXTERNAL_SERVER_URL__: string
  __INTERNAL_SERVER_URL__: string
}

globalForTests.__EXTERNAL_SERVER_URL__ = 'http://localhost:3001'
globalForTests.__INTERNAL_SERVER_URL__ = 'http://localhost:3001'

export {}
