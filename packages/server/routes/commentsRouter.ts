import { Router } from 'express'
import { Comment } from '../models/Comment'
import { Reaction } from '../models/Reaction'
import { sanitizeText } from '../utils/sanitizeText'
import { parsePositiveInt } from '../utils/parsePositiveInt'

const router = Router()

const TEXT_MAX = 50_000

router.get('/topics/:topicId/comments', async (req, res, next) => {
  try {
    const topicId = parsePositiveInt(req.params.topicId)
    if (!topicId) {
      res.status(400).json({ message: 'Некорректный topicId' })
      return
    }

    const comments = await Comment.findAll({
      where: { topicId },
      order: [['createdAt', 'DESC']],
    })

    res.json(comments)
  } catch (err) {
    next(err)
  }
})

router.get('/comments/:id', async (req, res, next) => {
  try {
    const id = parsePositiveInt(req.params.id)
    if (!id) {
      res.status(400).json({ message: 'Некорректный id' })
      return
    }

    const comment = await Comment.findByPk(id)
    if (!comment) {
      res.status(404).json({ message: 'Комментарий не найден' })
      return
    }

    res.json(comment)
  } catch (err) {
    next(err)
  }
})

router.post('/topics/:topicId/comments', async (req, res, next) => {
  try {
    const topicId = parsePositiveInt(req.params.topicId)
    if (!topicId) {
      res.status(400).json({ message: 'Некорректный topicId' })
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

    const comment = await Comment.create({
      topicId,
      authorId,
      text,
    })

    res.status(201).json(comment)
  } catch (err) {
    next(err)
  }
})

router.delete('/comments/:id', async (req, res, next) => {
  try {
    const id = parsePositiveInt(req.params.id)
    if (!id) {
      res.status(400).json({ message: 'Некорректный id' })
      return
    }

    await Reaction.destroy({
      where: { targetType: 'comment', targetId: id },
    })

    const deleted = await Comment.destroy({ where: { id } })
    if (deleted === 0) {
      res.status(404).json({ message: 'Комментарий не найден' })
      return
    }

    res.status(204).send()
  } catch (err) {
    next(err)
  }
})

export default router
