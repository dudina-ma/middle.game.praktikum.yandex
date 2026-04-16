export const ALLOWED_REACTION_EMOJIS = [
  '😀',
  '😃',
  '😄',
  '😎',
  '🤔',
  '😅',
  '🥳',
  '🔥',
  '🚢',
  '⚓',
  '🌊',
  '💥',
  '🎯',
  '👍',
  '👏',
  '✅',
  '❗',
  '🧠',
] as const

export type AllowedReactionEmoji = typeof ALLOWED_REACTION_EMOJIS[number]

export const REACTION_TARGET_TYPES = ['comment', 'reply'] as const

export type ReactionTargetType = typeof REACTION_TARGET_TYPES[number]

export const isAllowedReactionEmoji = (
  value: unknown
): value is AllowedReactionEmoji =>
  typeof value === 'string' &&
  (ALLOWED_REACTION_EMOJIS as readonly string[]).includes(value)

export const isReactionTargetType = (
  value: unknown
): value is ReactionTargetType =>
  typeof value === 'string' &&
  (REACTION_TARGET_TYPES as readonly string[]).includes(value)
