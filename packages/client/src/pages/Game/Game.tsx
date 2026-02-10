import EndGame from '../../components/EndGame/EndGame'
import StartGame from '../../components/StartGame/StartGame'
import { useState } from 'react'
const Game = () => {
  const [gameOver] = useState(false)

  return (
    <div>
      {<StartGame />}
      {gameOver && <EndGame />}
    </div>
  )
}
export default Game
