export function sanitizeText(input: unknown, maxLen: number): string | null {
  if (typeof input !== 'string') {
    return null
  }

  const trimmed = input.trim()
  if (!trimmed) {
    return null
  }

  const sliced = trimmed.slice(0, maxLen)

  return sliced.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    ''
  )
}
