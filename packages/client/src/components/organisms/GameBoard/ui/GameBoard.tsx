import { useEffect, useRef } from 'react'
import { Game } from '../game/core/Game'
import { GAME_CONFIG } from '../game/GameConfig'

export const GameBoard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameInstance = useRef<Game | null>(null)

  useEffect(() => {
    if (canvasRef.current && !gameInstance.current) {
      gameInstance.current = new Game(canvasRef.current, GAME_CONFIG)
      gameInstance.current.render()
    }

    return () => {
      if (gameInstance.current) {
        gameInstance.current.destroy()
        gameInstance.current = null
      }
    }
  }, [])

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  )
}
