import { useEffect, useRef, useState } from 'react'
import { GAME_CONFIG } from '../../Game/GameConfig'
import { Game, onFinishData } from '../../Game'

export const GameBoard: React.FC = () => {
  const [phase, setPhase] = useState<'game' | 'Победа' | 'Поражение'>('game')
  const [score, setScore] = useState<number>(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameInstance = useRef<Game | null>(null)

  const onFinish = (data: onFinishData) => {
    const result = data.result === 'lose' ? 'Поражение' : 'Победа'
    const score = data.score
    setPhase(result)
    setScore(score)
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
      {phase === 'game' ? (
        <canvas ref={canvasRef} />
      ) : (
        <h1>
          {phase}! ходов {score}
        </h1>
      )}
    </div>
  )
}
