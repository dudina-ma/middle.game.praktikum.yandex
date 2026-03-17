import { useCallback, useRef } from 'react'

export const useGameStartNotification = () => {
  const hasNotified = useRef(false)

  const notifyGameStart = useCallback(async () => {
    if (hasNotified.current) return

    if (!('Notification' in window)) {
      console.log('Notification API не поддерживается')
      return
    }

    const sendNotification = () => {
      new Notification('Морской бой', {
        body: 'Игра началась! Приготовьтесь к сражению!',
      })
      hasNotified.current = true
    }

    if (Notification.permission === 'granted') {
      sendNotification()
    } else if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        sendNotification()
      }
    }
  }, [])

  return { notifyGameStart }
}
