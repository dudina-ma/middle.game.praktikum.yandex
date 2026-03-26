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

const CATEGORY_NAME_TO_ID: Record<string, number> = {
  Тактика: 1,
  Баг: 2,
  Идеи: 3,
  Турнир: 4,
  UI: 5,
}

const TITLE_MAX = 255
const CONTENT_MAX = 50_000
const TAGS_MAX = 20

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
      res.status(401).json({ message: 'Нужно авторизоваться' })
      return
    }

    let categoryId: number | null = null
    if (req.body?.categoryId != null) {
      const cid = Number(req.body.categoryId)
      if (Number.isInteger(cid) && cid > 0) {
        categoryId = cid
      }
    } else if (typeof req.body?.category === 'string') {
      const mapped = CATEGORY_NAME_TO_ID[req.body.category.trim()]
      if (mapped !== undefined) {
        categoryId = mapped
      }
    }

    let tags: string | null = null
    if (Array.isArray(req.body?.tags)) {
      const parts = req.body.tags
        .filter((t: unknown): t is string => typeof t === 'string')
        .map((t: string) => t.trim())
        .filter(Boolean)
        .slice(0, TAGS_MAX)
      if (parts.length > 0) {
        tags = JSON.stringify(parts)
      }
    }

    const topic = await Topic.create({
      title,
      content,
      authorId,
      categoryId,
      tags,
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
