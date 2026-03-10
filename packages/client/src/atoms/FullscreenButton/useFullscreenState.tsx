import { useCallback, useEffect, useState } from 'react'
import { getFullscreenElement } from '../../utils/fullscreen'

const fullscreenEvents = [
  'fullscreenchange',
  'webkitfullscreenchange',
  'mozfullscreenchange',
  'MSFullscreenChange',
]

export const useFullscreenState = () => {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleFullscreenChange = useCallback(() => {
    setIsFullscreen(!!getFullscreenElement())
  }, [])

  useEffect(() => {
    fullscreenEvents.forEach(e =>
      document.addEventListener(e, handleFullscreenChange)
    )

    return () => {
      fullscreenEvents.forEach(e =>
        document.removeEventListener(e, handleFullscreenChange)
      )
    }
  }, [])

  return { isFullscreen }
}
