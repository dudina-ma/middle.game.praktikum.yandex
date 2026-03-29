import type { Request, Response } from 'express'
import { fetchYandexUser } from '../services/auth.service'

export const authController = {
  async verify(req: Request, res: Response) {
    try {
      const cookie = req.headers.cookie

      if (!cookie) {
        return res.status(401).json({ message: 'unauthorized' })
      }

      const result = await fetchYandexUser(cookie)

      if (result.setCookie) {
        res.setHeader('Set-Cookie', result.setCookie)
      }

      if (result.ok && result.user) {
        return res.status(200).json(result.user)
      }

      return res.status(401).json({ message: 'unauthorized' })
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' })
    }
  },
}
