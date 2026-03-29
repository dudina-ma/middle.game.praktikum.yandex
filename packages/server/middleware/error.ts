import type express from 'express'
import { ValidationError } from 'sequelize'

export const errorMiddleware = (
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
