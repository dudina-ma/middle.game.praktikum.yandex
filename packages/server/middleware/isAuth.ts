import type { AuthedRequest } from './../types/authedRequest'
import { fetchYandexUser } from './../services/auth.service'
import type { Request, Response, NextFunction } from 'express'
import { User } from '../models/User'

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookie = req.headers.cookie

    if (!cookie) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: No cookies provided' })
    }

    const result = await fetchYandexUser(cookie)

    if (result.setCookie) {
      res.setHeader('Set-Cookie', result.setCookie)
    }

    if (!result.ok || !result.user) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: Invalid Yandex session' })
    }

    const authUser = result.user
    ;(req as AuthedRequest).user = authUser
    await User.upsert({
      id: authUser.id,
      firstName: authUser.first_name,
      secondName: authUser.second_name,
      displayName: authUser.display_name,
    })

    return next()
  } catch (err) {
    console.error('Auth Middleware Error:', err)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
