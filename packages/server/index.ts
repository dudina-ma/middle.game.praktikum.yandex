import 'reflect-metadata'
import dotenv from 'dotenv'
import { connectDatabase, syncDatabase } from './sequelize'
import * as process from 'node:process'
import { app } from './app'

dotenv.config()

const port = Number(process.env.SERVER_PORT) || 3001

const onSyncError = (error: unknown) => {
  console.error('Failed to sync database. Server will not start', error)
}

const onAuthError = (error: unknown) => {
  console.error('Failed to connect to database. Server will not start', error)
}

const onServerStart = () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
}

connectDatabase()
  .then(() => {
    syncDatabase()
      .then(() => app.listen(port, onServerStart))
      .catch(onSyncError)
  })
  .catch(onAuthError)
