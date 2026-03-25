import 'reflect-metadata'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import express from 'express'
import { syncSequelizeModels, testSequelizeConnection } from './sequelize'
import commentsRouter from './routes/commentsRouter'
import repliesRouter from './routes/repliesRouter'
import topicsRouter from './routes/topicsRouter'

const app = express()
app.use(cors())
app.use(express.json({ limit: '1mb' }))
const port = Number(process.env.SERVER_PORT) || 3001

app.use('/api', commentsRouter)
app.use('/api', repliesRouter)
app.use('/api/topics', topicsRouter)

app.get('/friends', (_, res) => {
  res.json([
    { name: 'Саша', secondName: 'Панов' },
    { name: 'Лёша', secondName: 'Садовников' },
    { name: 'Серёжа', secondName: 'Иванов' },
  ])
})

app.get('/user', (_, res) => {
  res.json({ name: '</script>Степа', secondName: 'Степанов' })
})

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)')
})

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
