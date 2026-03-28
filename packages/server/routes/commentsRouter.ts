import { Router } from 'express'
import { Comment } from '../models/Comment'
import { Reaction } from '../models/Reaction'
import { User } from '../models/User'
import { sanitizeText } from '../utils/sanitizeText'
import { parsePositiveInt } from '../utils/parsePositiveInt'
import { isAuth } from '../middleware/isAuth'
import type { AuthedRequest } from '../types/authedRequest'
import { TEXT_CONTENT_MAX_LENGTH } from '../constants/validationLimits'

const router = Router()

const authorInclude = {
  model: User,
  as: 'author',
  attributes: ['id', 'firstName', 'secondName', 'displayName'],
}

router.get('/topics/:topicId/comments', isAuth, async (req, res, next) => {
  try {
    const topicId = parsePositiveInt(req.params.topicId)
    if (!topicId) {
      res.status(400).json({ message: 'Некорректный topicId' })
      return
    }

    const comments = await Comment.findAll({
      where: { topicId },
      include: [authorInclude],
      order: [['createdAt', 'DESC']],
    })

    res.json(comments)
  } catch (err) {
    next(err)
  }
})

router.get('/comments/:id', isAuth, async (req, res, next) => {
  try {
    const id = parsePositiveInt(req.params.id)
    if (!id) {
      res.status(400).json({ message: 'Некорректный id' })
      return
    }

    const comment = await Comment.findByPk(id, { include: [authorInclude] })
    if (!comment) {
      res.status(404).json({ message: 'Комментарий не найден' })
      return
    }

    res.json(comment)
  } catch (err) {
    next(err)
  }
})

router.post('/topics/:topicId/comments', isAuth, async (req, res, next) => {
  try {
    const topicId = parsePositiveInt(req.params.topicId)
    if (!topicId) {
      res.status(400).json({ message: 'Некорректный topicId' })
      return
    }

    const authorId = parsePositiveInt((req as AuthedRequest).user?.id)
    if (!authorId) {
      res.status(403).json({ message: 'Нужно авторизоваться' })
      return
    }

    const text = sanitizeText(req.body?.text, TEXT_CONTENT_MAX_LENGTH)
    if (!text) {
      res.status(400).json({ message: 'Нужен непустой text' })
      return
    }

    const comment = await Comment.create({
      topicId,
      authorId,
      text,
    })

    await comment.reload({ include: [authorInclude] })
    res.status(201).json(comment)
  } catch (err) {
    next(err)
  }
})

router.delete('/comments/:id', isAuth, async (req, res, next) => {
  try {
    const id = parsePositiveInt(req.params.id)
    if (!id) {
      res.status(400).json({ message: 'Некорректный id' })
      return
    }

    const authorId = parsePositiveInt((req as AuthedRequest).user?.id)
    if (!authorId) {
      res.status(403).json({ message: 'Нужно авторизоваться' })
      return
    }

    const comment = await Comment.findByPk(id)
    if (!comment) {
      res.status(404).json({ message: 'Комментарий не найден' })
      return
    }
    if (comment.authorId !== authorId) {
      res.status(403).json({ message: 'Нет прав на удаление' })
      return
    }

    await Reaction.destroy({
      where: { targetType: 'comment', targetId: id },
    })

    await comment.destroy()
    res.status(204).send()
  } catch (err) {
    next(err)
  }
})

export default router
