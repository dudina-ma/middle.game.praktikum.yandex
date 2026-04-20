import { BACKEND_SERVER_URL } from '../api/consts'
import type { Request, Response, NextFunction } from 'express'

export const authGuard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const publicPaths = ['/login', '/register', '/api', '/oauth', '/yandex']

  if (publicPaths.some(p => req.path.startsWith(p)) || req.path.includes('.')) {
    return next()
  }

  try {
    const response = await fetch(`${BACKEND_SERVER_URL}/auth/verify`, {
      headers: { Cookie: req.headers.cookie || '' },
    })

    if (response.ok) {
      return next()
    }
  } catch (e) {
    console.error('auth verify error' + e)
  }

  res.redirect('/login')
}
