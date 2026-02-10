import EndGame from '../../components/EndGame/EndGame'
import { useState } from 'react'
const Game = () => {
  const [gameOver] = useState(true)

  return <div>{gameOver && <EndGame />}</div>
}
export default Game
