import { Button, Flex, Typography } from 'antd'
import { useState } from 'react'

import styles from './style.module.css'

const { Title, Text } = Typography

const StartGame = () => {
  const [showTips, setShowTips] = useState(false)

  const handleStart = () => {
    // тут логика для старта игры
  }

  const handleShowTips = () => {
    setShowTips(true)
  }

  const tips = [
    '🎯 Цель игры: потопить все корабли противника',
    '🚢 Расставляйте свои корабли стратегически',
    '💥 Кликайте по клеткам поля для выстрела',
    '🔍 Ищите закономерности в выстрелах противника',
    '🏆 Первый, кто потопит все корабли, побеждает!',
  ]

  if (showTips) {
    return (
      <div className={styles.backgroundContainer}>
        <div className={styles.contentWrapper}>
          <Flex vertical gap="large" align="center">
            <div className={styles.resultIcon}>📚</div>

            <Title level={1} className={styles.winTitle}>
              Как играть?
            </Title>

            <div className={styles.tipsContainer}>
              {tips.map((tip, index) => (
                <div key={index} className={styles.tipItem}>
                  <Text className={styles.description}>{tip}</Text>
                </div>
              ))}
            </div>

            <div className={styles.buttonsContainer}>
              <Button
                type="primary"
                onClick={handleStart}
                size="large"
                className={styles.restartButton}>
                🚀 Начать игру
              </Button>

              <Button
                onClick={() => setShowTips(false)}
                size="large"
                className={styles.menuButton}>
                ↩️ Назад
              </Button>
            </div>
          </Flex>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.backgroundContainer}>
      <div className={styles.contentWrapper}>
        <Flex vertical gap="large" align="center">
          <div className={styles.resultIcon}>⚓🌊</div>

          <Title level={1} className={styles.winTitle}>
            Морской Бой
          </Title>

          <Text className={styles.winText}>
            Готовы к захватывающей морской битве?
          </Text>

          <Text className={styles.description}>
            Стратегическая игра, где вам предстоит потопить флот противника,
            угадывая расположение его корабли на игровом поле. Проявите
            тактическое мышление и удачу!
          </Text>

          <div className={styles.buttonsContainer}>
            <Button
              type="primary"
              onClick={handleStart}
              size="large"
              className={styles.restartButton}>
              ⚓ Начать игру
            </Button>

            <Button
              onClick={handleShowTips}
              size="large"
              className={styles.menuButton}>
              📖 Как играть?
            </Button>
          </div>

          <Text className={styles.footerText}>
            Соберите друзей и устройте настоящую морскую баталию!
          </Text>
        </Flex>
      </div>
    </div>
  )
}

export default StartGame
