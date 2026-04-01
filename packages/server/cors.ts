import cors from 'cors'
import process from 'node:process'

const origin = process.env.VITE_APP_URL || 'http://localhost:3000'

export const serverCors = cors({
  origin: origin,
  credentials: true,
})
