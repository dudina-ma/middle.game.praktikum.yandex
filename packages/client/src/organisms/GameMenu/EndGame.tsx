import { Button, Flex, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from '../../store'
import { resetGame } from '../../slices/gameSlice'
import styles from './style.module.css'
import { RoutesEnum } from '../../paths'
import { useGetUserQuery } from '../../api/authApi'
import { useSubmitGameResult } from '../../hooks/useSubmitGameResult'

const { Title, Text } = Typography

const EndGame = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { phase, score } = useSelector(state => state.game)
  const { data: user } = useGetUserQuery()
  const { submitGameResult } = useSubmitGameResult()
  const submittedResultRef = useRef<string | null>(null)

  const isWin = phase === 'victory'

  useEffect(() => {
    if (phase !== 'victory' && phase !== 'defeat') {
      return
    }

    if (!user?.id) {
      return
    }

    const submitKey = `${user.id}:${phase}:${score}`
    if (submittedResultRef.current === submitKey) {
      return
    }

    submittedResultRef.current = submitKey

    const displayName =
      user?.display_name || `${user?.first_name ?? ''} ${user?.second_name ?? ''}`.trim() || user?.login || 'Гость'

    void submitGameResult({
      user_id: user?.id ?? 0,
      display_name: displayName,
      score,
      date: Date.now(),
    })
  }, [phase, score, submitGameResult, user])

  const handlePlayAgain = () => {
    dispatch(resetGame())
  }

  const handleMainMenu = () => {
    dispatch(resetGame())
    navigate(RoutesEnum.Main)
  }

  return (
    <div className={styles.backgroundContainer}>
      <div className={styles.contentWrapper}>
        <Flex vertical gap="large" align="center">
          <div className={`${styles.resultIcon} ${isWin ? styles.won : ''}`}>
            {isWin ? '🏆🎉' : '💥😔'}
          </div>

          <Title level={1} className={isWin ? styles.winTitle : styles.loseTitle}>
            {isWin ? 'Победа!' : 'Поражение'}
          </Title>

          <Text className={styles.scoreText}>Ваш счет: {score}</Text>

          <Text className={isWin ? styles.winText : styles.loseText}>
            {isWin ? 'Вы одержали великолепную победу!' : 'Ваш флот был потоплен...'}
          </Text>

          <Text className={styles.description}>
            {isWin
              ? 'Вы успешно уничтожили все корабли противника и доказали свое мастерство в морской стратегии!'
              : 'Не отчаивайтесь! Каждое поражение - это урок, который сделает вас сильнее в следующей битве.'}
          </Text>

          <div>
            <Button
              type="primary"
              onClick={handlePlayAgain}
              size="large"
              className={styles.restartButton}>
              🔄 Сыграть еще
            </Button>

            <Button onClick={handleMainMenu} size="large" className={styles.menuButton}>
              🏠 В главное меню
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
