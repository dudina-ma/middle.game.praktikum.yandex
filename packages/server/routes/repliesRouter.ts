import { Router } from 'express'
import { Reply } from '../models/Reply'
import { Reaction } from '../models/Reaction'
import { sanitizeText } from '../utils/sanitizeText'
import { parsePositiveInt } from '../utils/parsePositiveInt'

const router = Router()

const TEXT_MAX = 50_000

router.get('/comments/:commentId/replies', async (req, res, next) => {
  try {
    const commentId = parsePositiveInt(req.params.commentId)
    if (!commentId) {
      res.status(400).json({ message: 'Некорректный commentId' })
      return
    }

    const replies = await Reply.findAll({
      where: { commentId },
      order: [['createdAt', 'DESC']],
    })

    res.json(replies)
  } catch (err) {
    next(err)
  }
})

router.get('/replies/:id', async (req, res, next) => {
  try {
    const id = parsePositiveInt(req.params.id)
    if (!id) {
      res.status(400).json({ message: 'Некорректный id' })
      return
    }

    const reply = await Reply.findByPk(id)
    if (!reply) {
      res.status(404).json({ message: 'Ответ не найден' })
      return
    }

    res.json(reply)
  } catch (err) {
    next(err)
  }
})

router.post('/comments/:commentId/replies', async (req, res, next) => {
  try {
    const commentId = parsePositiveInt(req.params.commentId)
    if (!commentId) {
      res.status(400).json({ message: 'Некорректный commentId' })
      return
    }

    const authorId = parsePositiveInt(req.body?.authorId)
    if (!authorId) {
      res.status(400).json({ message: 'Нужен положительный authorId' })
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

    res.status(201).json(reply)
  } catch (err) {
    next(err)
  }
})

router.delete('/replies/:id', async (req, res, next) => {
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
