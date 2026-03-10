import { useEffect, useRef } from 'react'
import { GAME_CONFIG } from '../../Game/GameConfig'
import { Game, onFinishData } from '../../Game'
import { useDispatch, useSelector } from '../../../../store'
import { finishGame } from '../../../../slices/gameSlice'

export const GameBoard: React.FC = () => {
  const dispatch = useDispatch()
  const { phase } = useSelector(state => state.game)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameInstance = useRef<Game | null>(null)

  const onFinish = (data: onFinishData) => {
    dispatch(
      finishGame({
        result: data.result,
        score: data.score,
      })
    )
  }

  useEffect(() => {
    if (canvasRef.current && !gameInstance.current && phase === 'game') {
      gameInstance.current = new Game(canvasRef.current, GAME_CONFIG, onFinish)
      gameInstance.current.render()
    }

    return () => {
      if (gameInstance.current) {
        gameInstance.current.destroy()
        gameInstance.current = null
      }
    }
  }, [phase])

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  )
}
