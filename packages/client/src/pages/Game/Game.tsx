import { Flex } from 'antd'
import { GameBoard } from '../../components/organisms/GameBoard/ui/GameBoard'
import EndGame from '../../components/EndGame/EndGame'
import { useState } from 'react'

const Game = () => {
  const [gameOver] = useState(false)
  
  return (
    <Flex justify="center">
      {gameOver?  <EndGame /> : <GameBoard />}
      
    </Flex>
  )


}
export default Game
