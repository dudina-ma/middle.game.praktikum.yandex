import { Router } from 'express'
import { Op } from 'sequelize'
import { Reply } from '../models/Reply'
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

type ReplyWithChildren = {
  id: number
  authorId: number
  commentId: number
  parentReplyId: number | null
  text: string
  createdAt: string
  updatedAt: string
  author?: User
  children: ReplyWithChildren[]
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
      order: [['createdAt', 'ASC']],
    })

    const nodesById = new Map<number, ReplyWithChildren>()
    const roots: ReplyWithChildren[] = []

    for (const reply of replies) {
      const plain = reply.get({ plain: true }) as Omit<
        ReplyWithChildren,
        'children'
      >
      nodesById.set(plain.id, { ...plain, children: [] })
    }

    for (const node of nodesById.values()) {
      if (node.parentReplyId !== null && nodesById.has(node.parentReplyId)) {
        nodesById.get(node.parentReplyId)?.children.push(node)
      } else {
        roots.push(node)
      }
    }

    res.json(roots)
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
      res.status(403).json({ message: 'Нужно авторизоваться' })
      return
    }

    const text = sanitizeText(req.body?.text, TEXT_CONTENT_MAX_LENGTH)
    if (!text) {
      res.status(400).json({ message: 'Нужен непустой text' })
      return
    }

    let parentReplyId: number | null = null
    if (req.body?.parentReplyId != null) {
      const parsedParentReplyId = parsePositiveInt(req.body.parentReplyId)
      if (!parsedParentReplyId) {
        res.status(400).json({ message: 'Некорректный parentReplyId' })
        return
      }

      const parentReply = await Reply.findOne({
        where: { id: parsedParentReplyId, commentId },
      })
      if (!parentReply) {
        res.status(404).json({ message: 'Родительский ответ не найден' })
        return
      }
      parentReplyId = parsedParentReplyId
    }

    const reply = await Reply.create({
      commentId,
      authorId,
      parentReplyId,
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

    const authorId = parsePositiveInt((req as AuthedRequest).user?.id)
    if (!authorId) {
      res.status(403).json({ message: 'Нужно авторизоваться' })
      return
    }

    const rootReply = await Reply.findByPk(id)
    if (!rootReply) {
      res.status(404).json({ message: 'Ответ не найден' })
      return
    }
    if (rootReply.authorId !== authorId) {
      res.status(403).json({ message: 'Нет прав на удаление' })
      return
    }

    const subtreeIds: number[] = [rootReply.id]
    let frontier: number[] = [rootReply.id]

    while (frontier.length > 0) {
      const children = await Reply.findAll({
        where: {
          commentId: rootReply.commentId,
          parentReplyId: { [Op.in]: frontier },
        },
        attributes: ['id'],
      })

      const childIds = children.map(child => child.id)
      if (childIds.length === 0) {
        break
      }

      subtreeIds.push(...childIds)
      frontier = childIds
    }

    await Reaction.destroy({
      where: {
        targetType: 'reply',
        targetId: { [Op.in]: subtreeIds },
      },
    })

    await Reply.destroy({ where: { id: { [Op.in]: subtreeIds } } })

    res.status(204).send()
  } catch (err) {
    next(err)
  }
})

export default router
