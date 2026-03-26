import type { Request, Response, NextFunction } from 'express'
import { User } from '../models/User'
import type { AuthUser } from '../types/auth'
import type { AuthedRequest } from '../types/authedRequest'

//Заглушка авторизации.

export const isAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authUser: AuthUser = {
      id: 1,
      firstName: 'Petya',
      secondName: 'Pupkin',
      displayName: 'Petya Pupkin',
    }

    ;(req as AuthedRequest).user = authUser

    await User.upsert({
      id: authUser.id,
      firstName: authUser.firstName,
      secondName: authUser.secondName,
      displayName: authUser.displayName,
    })

    next()
  } catch (err) {
    next(err)
  }
}
