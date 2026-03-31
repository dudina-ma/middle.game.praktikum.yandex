import 'reflect-metadata'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import express from 'express'
import { ValidationError } from 'sequelize'
import { syncSequelizeModels, testSequelizeConnection } from './sequelize'
import commentsRouter from './routes/commentsRouter'
import repliesRouter from './routes/repliesRouter'
import topicsRouter from './routes/topicsRouter'
import reactionsRouter from './routes/reactionsRouter'
import authRouter from './routes/authRouter'

const app = express()
app.use(cors())
app.use(express.json({ limit: '1mb' }))
const port = Number(process.env.SERVER_PORT) || 3001

app.use('/api', commentsRouter)
app.use('/api', repliesRouter)
app.use('/api', reactionsRouter)
app.use('/api/topics', topicsRouter)
app.use('/auth', authRouter)

app.get('/health', (_, res) => {
  res.status(200).json({ status: 'ok' })
})

app.use(
  (
    err: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(err)
    if (err instanceof ValidationError) {
      res.status(400).json({
        message: 'Некорректные данные',
        errors: err.errors.map(e => ({
          message: e.message,
          path: e.path,
          value: e.value,
        })),
      })
      return
    }
    res.status(500).json({ message: 'Внутренняя ошибка сервера' })
  }
)

const initializeServer = async (): Promise<void> => {
  try {
    await testSequelizeConnection()
    await syncSequelizeModels()

    app.listen(port, () => {
      console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
    })
  } catch (error) {
    console.error(
      'Failed to connect to database. Server will not start.',
      error
    )
    process.exit(1)
  }
}

void initializeServer()
