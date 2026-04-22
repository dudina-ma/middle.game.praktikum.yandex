export function getAvatarUrl(avatar?: string | null): string | undefined {
  if (!avatar) return undefined
  const trimmed = avatar.trim()
  if (!trimmed) return undefined
  if (trimmed === 'null' || trimmed === 'undefined') return undefined

  if (/^https?:\/\//i.test(trimmed)) return trimmed
  if (trimmed.startsWith('/resources/')) return `/yandex${trimmed}`
  if (trimmed.startsWith('/')) return `/yandex/resources${trimmed}`

  return `/yandex/${trimmed}`
}
