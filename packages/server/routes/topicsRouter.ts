import { Router } from 'express'
import { Topic } from '../models/Topic'
import { User } from '../models/User'
import { sanitizeText } from '../utils/sanitizeText'
import { parsePositiveInt } from '../utils/parsePositiveInt'
import { isAuth } from '../middleware/isAuth'
import type { AuthedRequest } from '../types/authedRequest'

const router = Router()

const authorInclude = {
  model: User,
  as: 'author',
  attributes: ['id', 'firstName', 'secondName', 'displayName'],
}

const TITLE_MAX = 255
const CONTENT_MAX = 50_000

router.get('/', isAuth, async (_req, res, next) => {
  try {
    const topics = await Topic.findAll({
      include: [authorInclude],
      order: [['createdAt', 'DESC']],
    })
    res.json(topics)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', isAuth, async (req, res, next) => {
  try {
    const id = parsePositiveInt(req.params.id)
    if (!id) {
      res.status(400).json({ message: 'Некорректный id' })
      return
    }
    const topic = await Topic.findByPk(id, { include: [authorInclude] })
    if (!topic) {
      res.status(404).json({ message: 'Топик не найден' })
      return
    }
    res.json(topic)
  } catch (err) {
    next(err)
  }
})

router.post('/', isAuth, async (req, res, next) => {
  try {
    const title = sanitizeText(req.body?.title, TITLE_MAX)
    const content = sanitizeText(req.body?.content, CONTENT_MAX)

    if (!title || !content) {
      res.status(400).json({ message: 'Нужны непустые title и content' })
      return
    }

    const authorId = parsePositiveInt((req as AuthedRequest).user?.id)
    if (!authorId) {
      res.status(403).json({ message: 'Нужно авторизоваться' })
      return
    }

    const topic = await Topic.create({
      title,
      content,
      authorId,
    })
    await topic.reload({ include: [authorInclude] })
    res.status(201).json(topic)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', isAuth, async (req, res, next) => {
  try {
    const id = parsePositiveInt(req.params.id)
    if (!id) {
      res.status(400).json({ message: 'Некорректный id' })
      return
    }
    const deleted = await Topic.destroy({ where: { id } })
    if (deleted === 0) {
      res.status(404).json({ message: 'Топик не найден' })
      return
    }
    res.status(204).send()
  } catch (err) {
    next(err)
  }
})

export default router
