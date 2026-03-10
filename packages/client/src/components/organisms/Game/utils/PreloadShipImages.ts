type ShipSpritesConfig = Readonly<Record<number, string>>

const imageCache = new Map<number, HTMLImageElement>()
const hitImageCache: { img: HTMLImageElement | null } = { img: null }

const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error(`Failed to load ${src}`))
    img.src = src
  })

export const preloadShipImages = async (
  shipSprites: ShipSpritesConfig,
  hitSpriteSrc?: string
): Promise<void> => {
  const entries = Object.entries(shipSprites) as [string, string][]
  const results = await Promise.allSettled(
    entries.map(([len, src]) =>
      loadImage(src).then(img => [Number(len), img] as const)
    )
  )
  results.forEach(result => {
    if (result.status === 'fulfilled') {
      const [length, img] = result.value
      imageCache.set(length, img)
    }
  })
  if (hitSpriteSrc) {
    try {
      hitImageCache.img = await loadImage(hitSpriteSrc)
    } catch {
      hitImageCache.img = null
    }
  }
}

export const getShipImage = (length: number): HTMLImageElement | null =>
  imageCache.get(length) ?? null

export const getHitImage = (): HTMLImageElement | null => hitImageCache.img
