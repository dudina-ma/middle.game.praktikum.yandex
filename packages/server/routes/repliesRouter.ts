import { Router } from 'express'
import { Reply } from '../models/Reply'
import { Reaction } from '../models/Reaction'
import { User } from '../models/User'
import { sanitizeText } from '../utils/sanitizeText'
import { parsePositiveInt } from '../utils/parsePositiveInt'
import { isAuth } from '../middleware/isAuth'
import type { AuthedRequest } from '../types/authedRequest'

const router = Router()

const TEXT_MAX = 50_000

const authorInclude = {
  model: User,
  as: 'author',
  attributes: ['id', 'firstName', 'secondName', 'displayName'],
}

router.get('/comments/:commentId/replies', isAuth, async (req, res, next) => {
  try {
    const commentId = parsePositiveInt(req.params.commentId)
    if (!commentId) {
      res.status(400).json({ message: 'Некорректный commentId' })
      return
    }

    const replies = await Reply.findAll({
      where: { commentId },
      include: [authorInclude],
      order: [['createdAt', 'DESC']],
    })

    res.json(replies)
  } catch (err) {
    next(err)
  }
})

router.get('/replies/:id', isAuth, async (req, res, next) => {
  try {
    const id = parsePositiveInt(req.params.id)
    if (!id) {
      res.status(400).json({ message: 'Некорректный id' })
      return
    }

    const reply = await Reply.findByPk(id, { include: [authorInclude] })
    if (!reply) {
      res.status(404).json({ message: 'Ответ не найден' })
      return
    }

    res.json(reply)
  } catch (err) {
    next(err)
  }
})

router.post('/comments/:commentId/replies', isAuth, async (req, res, next) => {
  try {
    const commentId = parsePositiveInt(req.params.commentId)
    if (!commentId) {
      res.status(400).json({ message: 'Некорректный commentId' })
      return
    }

    const authorId = parsePositiveInt((req as AuthedRequest).user?.id)
    if (!authorId) {
      res.status(401).json({ message: 'Нужно авторизоваться' })
      return
    }

    const text = sanitizeText(req.body?.text, TEXT_MAX)
    if (!text) {
      res.status(400).json({ message: 'Нужен непустой text' })
      return
    }

    const reply = await Reply.create({
      commentId,
      authorId,
      text,
    })

    await reply.reload({ include: [authorInclude] })
    res.status(201).json(reply)
  } catch (err) {
    next(err)
  }
})

router.delete('/replies/:id', isAuth, async (req, res, next) => {
  try {
    const id = parsePositiveInt(req.params.id)
    if (!id) {
      res.status(400).json({ message: 'Некорректный id' })
      return
    }

    await Reaction.destroy({
      where: { targetType: 'reply', targetId: id },
    })

    const deleted = await Reply.destroy({ where: { id } })
    if (deleted === 0) {
      res.status(404).json({ message: 'Ответ не найден' })
      return
    }

    res.status(204).send()
  } catch (err) {
    next(err)
  }
})

export default router
