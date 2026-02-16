import { Button, Flex, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from '../../store'
import { resetGame } from '../../slices/gameSlice'
import styles from './style.module.css'

const { Title, Text } = Typography

const EndGame = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { phase, score } = useSelector(state => state.game)

  const isWin = phase === 'victory'

  const handlePlayAgain = () => {
    dispatch(resetGame())
  }

  const handleMainMenu = () => {
    dispatch(resetGame())
    navigate('/')
  }

  return (
    <div className={styles.backgroundContainer}>
      <div className={styles.contentWrapper}>
        <Flex vertical gap="large" align="center">
          <div className={`${styles.resultIcon} ${isWin ? styles.won : ''}`}>
            {isWin ? '🏆🎉' : '💥😔'}
          </div>

          <Title
            level={1}
            className={isWin ? styles.winTitle : styles.loseTitle}>
            {isWin ? 'Победа!' : 'Поражение'}
          </Title>

          <Text className={styles.scoreText}>Ваш счёт: {score}</Text>

          <Text className={isWin ? styles.winText : styles.loseText}>
            {isWin
              ? 'Вы одержали великолепную победу!'
              : 'Ваш флот был потоплен...'}
          </Text>

          <Text className={styles.description}>
            {isWin
              ? 'Вы успешно уничтожили все корабли противника и доказали своё мастерство в морской стратегии!'
              : 'Не отчаивайтесь! Каждое поражение - это урок, который сделает вас сильнее в следующей битве.'}
          </Text>

          <div>
            <Button
              type="primary"
              onClick={handlePlayAgain}
              size="large"
              className={styles.restartButton}>
              🔄 Play again
            </Button>

            <Button
              onClick={handleMainMenu}
              size="large"
              className={styles.menuButton}>
              🏠 Main menu
            </Button>
          </div>

          <Text className={styles.footerText}>
            {isWin
              ? 'Ваше имя будет записано в анналах морской славы!'
              : 'Соберите флот и возвращайтесь к бою!'}
          </Text>
        </Flex>
      </div>
    </div>
  )
}

export default EndGame
