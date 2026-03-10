import EndGame from '../../organisms/GameMenu/EndGame'
import StartGame from '../../organisms/GameMenu/StartGame'
import { GameBoard } from '../../components/organisms/GameBoard/ui/GameBoard'
import { Flex } from 'antd'
import { useSelector } from '../../store'
import { ComponentType } from 'react'
import type { GamePhase } from '../../slices/gameSlice'

const GAME_CONTENT_CONFIG: Record<GamePhase, ComponentType> = {
  start: StartGame,
  game: GameBoard,
  victory: EndGame,
  defeat: EndGame,
}

const Game = () => {
  const { phase } = useSelector(state => state.game)

  const GameContent = GAME_CONTENT_CONFIG[phase]

  return (
    <Flex justify="center">
      <GameContent />
    </Flex>
  )
}

export default Game
