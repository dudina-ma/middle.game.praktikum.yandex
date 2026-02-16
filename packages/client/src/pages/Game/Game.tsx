// src/pages/Game/index.tsx
import EndGame from '../../organisms/GameMenu/EndGame'
import StartGame from '../../organisms/GameMenu/StartGame'
import { GameBoard } from '../../components/organisms/GameBoard/ui/GameBoard'
import { Flex } from 'antd'
import { useSelector } from '../../store'

const Game = () => {
  const { phase } = useSelector(state => state.game)

  return (
    <Flex justify="center">
      {phase === 'start' && <StartGame />}
      {phase === 'game' && <GameBoard />}
      {(phase === 'victory' || phase === 'defeat') && <EndGame />}
    </Flex>
  )
}

export default Game
