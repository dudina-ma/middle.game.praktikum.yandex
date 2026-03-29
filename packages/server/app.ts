import express from 'express'
import { serverCors } from './cors'
import { errorMiddleware } from './middleware/error'
import commentsRouter from './routes/commentsRouter'
import repliesRouter from './routes/repliesRouter'
import reactionsRouter from './routes/reactionsRouter'
import topicsRouter from './routes/topicsRouter'

export const app = express()

app.use(serverCors)
app.use(errorMiddleware)
app.use(express.json({ limit: '1mb' }))

app.use('/api', commentsRouter)
app.use('/api', repliesRouter)
app.use('/api', reactionsRouter)
app.use('/api/topics', topicsRouter)

app.get('/health', (_, res) => {
  res.status(200).json({ status: 'ok' })
})
