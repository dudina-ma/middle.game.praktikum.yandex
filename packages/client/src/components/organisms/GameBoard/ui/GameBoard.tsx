import { useEffect, useRef } from 'react'
import { GAME_CONFIG } from '../../Game/GameConfig'
import { Game, onFinishData } from '../../Game'

export const GameBoard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameInstance = useRef<Game | null>(null)
  const onFinish = (data: onFinishData) => {
    console.log(data)
  }

  useEffect(() => {
    if (canvasRef.current && !gameInstance.current) {
      gameInstance.current = new Game(canvasRef.current, GAME_CONFIG, onFinish)
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
