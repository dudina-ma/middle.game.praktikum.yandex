export function parsePositiveInt(value: unknown): number | null {
  const n = typeof value === 'number' ? value : Number(value)
  if (!Number.isInteger(n) || n < 1) return null
  return n
}
