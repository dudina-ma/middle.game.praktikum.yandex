import { Button, Flex, Typography } from 'antd'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const { Title, Paragraph } = Typography

const BackgroundContainer = styled.div`
  background: linear-gradient(135deg, #0c2461 0%, #1e3799 50%, #4a69bd 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(
        circle at 20% 80%,
        rgba(255, 255, 255, 0.1) 0.06rem,
        transparent 0.06rem
      ),
      radial-gradient(
        circle at 80% 20%,
        rgba(255, 255, 255, 0.1) 0.0625rem,
        transparent 0.0625rem
      );
    background-size: 3rem 3rem;
    z-index: 1;
  }
`

const ContentWrapper = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 3rem 2.5rem;
  border-radius: 1.25rem;
  text-align: center;
  box-shadow: 0 1.25rem 2.5rem rgba(0, 0, 0, 0.3);
  max-width: 37.5rem;
  width: 100%;
  position: relative;
  z-index: 2;
  border: 0.1rem solid #ffd700;
`

const GameLogo = styled.div`
  font-size: 3rem;
  margin-bottom: 1.25rem;
  color: #1a237e;
`

const BaseButton = styled(Button)`
  width: 100%;
  height: 3rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.6rem;
  transition: all 0.3s ease;
  margin-bottom: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;

  &:hover {
    transform: translateY(-0.1rem);
    box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.15);
  }
`

const GameButton = styled(BaseButton)`
  && {
    background: linear-gradient(135deg, #1890ff, #52c41a);
    border: none;
    color: white;
    font-size: 1.25rem;

    &:hover {
      background: linear-gradient(135deg, #40a9ff, #73d13d);
      color: white;
      border: none;
    }

    &:active {
      background: linear-gradient(135deg, #096dd9, #389e0d);
    }
  }
`

const MenuButton = styled(BaseButton)`
  && {
    background-color: white;
    border: 0.1rem solid #1890ff;
    color: #1890ff;

    &:hover {
      background-color: #1890ff;
      color: white;
      border-color: #40a9ff;
    }

    &:active {
      background-color: #096dd9;
      border-color: #096dd9;
    }
  }
`

const Main = () => {
  const navigate = useNavigate()

  return (
    <BackgroundContainer>
      <ContentWrapper>
        <Flex vertical gap="large" align="center">
          <GameLogo>⚓🚢💥</GameLogo>

          <Title level={1}>Морской бой</Title>

          <Paragraph>
            Классическая стратегическая игра, где два игрока по очереди атакуют
            корабли противника. Разместите свои корабли на поле 10×10 и
            попытайтесь уничтожить флот врага раньше, чем он уничтожит ваш!
          </Paragraph>

          <div style={{ width: '100%' }}>
            <GameButton
              type="primary"
              onClick={() => navigate('/game')}
              size="large">
              🎮 Game
            </GameButton>

            <MenuButton onClick={() => navigate('/leaderboard')} size="large">
              🏆 Leaderboard
            </MenuButton>

            <MenuButton onClick={() => navigate('/forum')} size="large">
              💬 Forum
            </MenuButton>

            <MenuButton onClick={() => navigate('/profile')} size="large">
              👤 Profile
            </MenuButton>
          </div>

          <Paragraph type="secondary">
            Удачи в игре, адмирал! Покажите своё мастерство в морских сражениях.
          </Paragraph>
        </Flex>
      </ContentWrapper>
    </BackgroundContainer>
  )
}

export default Main
