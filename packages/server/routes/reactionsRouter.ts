import { Router } from 'express'
import { Comment } from '../models/Comment'
import { Reply } from '../models/Reply'
import { Reaction } from '../models/Reaction'
import { User } from '../models/User'
import { parsePositiveInt } from '../utils/parsePositiveInt'
import {
  isAllowedReactionEmoji,
  isReactionTargetType,
} from '../utils/reactionEmojis'
import { isAuth } from '../middleware/isAuth'
import type { AuthedRequest } from '../types/authedRequest'

const router = Router()

const userInclude = {
  model: User,
  as: 'user',
  attributes: ['id', 'firstName', 'secondName', 'displayName'],
}

async function assertTargetExists(
  targetType: 'comment' | 'reply',
  targetId: number
): Promise<boolean> {
  if (targetType === 'comment') {
    const row = await Comment.findByPk(targetId)
    return row !== null
  }
  const row = await Reply.findByPk(targetId)
  return row !== null
}

router.post('/reactions', isAuth, async (req, res, next) => {
  try {
    const userId = parsePositiveInt((req as AuthedRequest).user?.id)
    if (!userId) {
      res.status(403).json({ message: 'Нужно авторизоваться' })
      return
    }

    const targetType = req.body?.targetType
    if (!isReactionTargetType(targetType)) {
      res.status(400).json({ message: 'Нужен targetType: comment или reply' })
      return
    }

    const targetId = parsePositiveInt(req.body?.targetId)
    if (!targetId) {
      res.status(400).json({ message: 'Нужен положительный targetId' })
      return
    }

    const emoji = req.body?.emoji
    if (!isAllowedReactionEmoji(emoji)) {
      res.status(400).json({
        message: 'Недопустимый emoji',
      })
      return
    }

    const exists = await assertTargetExists(targetType, targetId)
    if (!exists) {
      res.status(404).json({ message: 'Комментарий или ответ не найден' })
      return
    }

    const existing = await Reaction.findOne({
      where: { userId, targetType, targetId },
      include: [userInclude],
    })

    if (existing) {
      await existing.update({ emoji })
      await existing.reload({ include: [userInclude] })
      res.status(200).json(existing)
      return
    }

    const reaction = await Reaction.create({
      userId,
      targetType,
      targetId,
      emoji,
    })

    await reaction.reload({ include: [userInclude] })
    res.status(201).json(reaction)
  } catch (err) {
    next(err)
  }
})

router.delete('/reactions', isAuth, async (req, res, next) => {
  try {
    const userId = parsePositiveInt((req as AuthedRequest).user?.id)
    if (!userId) {
      res.status(403).json({ message: 'Нужно авторизоваться' })
      return
    }

    const targetType = req.body?.targetType
    if (!isReactionTargetType(targetType)) {
      res.status(400).json({ message: 'Нужен targetType: comment или reply' })
      return
    }

    const targetId = parsePositiveInt(req.body?.targetId)
    if (!targetId) {
      res.status(400).json({ message: 'Нужен положительный targetId' })
      return
    }

    const deleted = await Reaction.destroy({
      where: { userId, targetType, targetId },
    })

    if (deleted === 0) {
      res.status(404).json({ message: 'Реакция не найдена' })
      return
    }

    res.status(204).send()
  } catch (err) {
    next(err)
  }
})

router.get('/reactions', isAuth, async (req, res, next) => {
  try {
    const targetType = req.query.targetType
    if (!isReactionTargetType(targetType)) {
      res.status(400).json({ message: 'Нужен targetType: comment или reply' })
      return
    }

    const targetId = parsePositiveInt(String(req.query.targetId ?? ''))
    if (!targetId) {
      res.status(400).json({ message: 'Нужен положительный targetId' })
      return
    }

    const reactions = await Reaction.findAll({
      where: { targetType, targetId },
      include: [userInclude],
      order: [['createdAt', 'ASC']],
    })

    res.json(reactions)
  } catch (err) {
    next(err)
  }
})

export default router
