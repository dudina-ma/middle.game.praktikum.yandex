import EndGame from '../../components/GameMenu/EndGame'
import StartGame from '../../components/GameMenu/StartGame'
import { useState } from 'react'
const Game = () => {
  const [gameOver] = useState(false)
  const [runGame] = useState(false)
  return (
    <div>
      {!gameOver && !runGame && <StartGame />}
      {gameOver && !runGame && <EndGame />}
    </div>
  )
}
export default Game
