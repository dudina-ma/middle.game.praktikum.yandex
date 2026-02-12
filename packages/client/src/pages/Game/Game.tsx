import EndGame from '../../organisms/GameMenu/EndGame'
import StartGame from '../../organisms/GameMenu/StartGame'
import { Flex } from 'antd'
import { GameBoard } from '../../components/organisms/GameBoard/ui/GameBoard'
import { useState } from 'react'
const Game = () => {
  const [gameOver] = useState(false)
  const [runGame] = useState(false)
  return (
    <Flex justify="center">
      {!gameOver && !runGame && <StartGame />}
      {!gameOver && runGame && <GameBoard />}
      {gameOver && !runGame && <EndGame />}
    </Flex>
  )
}
export default Game
