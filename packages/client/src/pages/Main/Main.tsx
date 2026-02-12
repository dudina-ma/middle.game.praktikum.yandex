import { Button, Flex, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import styles from './style.module.css'

const { Title, Paragraph } = Typography

const Main = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.backgroundContainer}>
      <div className={styles.contentWrapper}>
        <Flex vertical gap="large" align="center">
          <div className={styles.gameLogo}>⚓🚢💥</div>

          <Title level={1}>Морской бой</Title>

          <Paragraph>
            Классическая стратегическая игра, где два игрока по очереди атакуют
            корабли противника. Разместите свои корабли на поле 10×10 и
            попытайтесь уничтожить флот врага раньше, чем он уничтожит ваш!
          </Paragraph>

          <div className={styles.buttonsContainer}>
            <Button
              type="primary"
              onClick={() => navigate('/game')}
              size="large"
              className={styles.gameButton}>
              🎮 Game
            </Button>

            <Button
              onClick={() => navigate('/leaderboard')}
              size="large"
              className={styles.menuButton}>
              🏆 Leaderboard
            </Button>

            <Button
              onClick={() => navigate('/forum')}
              size="large"
              className={styles.menuButton}>
              💬 Forum
            </Button>

            <Button
              onClick={() => navigate('/profile')}
              size="large"
              className={styles.menuButton}>
              👤 Profile
            </Button>
          </div>

          <Paragraph type="secondary">
            Удачи в игре, адмирал! Покажите своё мастерство в морских сражениях.
          </Paragraph>
        </Flex>
      </div>
    </div>
  )
}

export default Main
