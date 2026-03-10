import { useEffect, useState } from 'react'
import { Alert } from 'antd'
import styled from 'styled-components'

const StyledBanner = styled(Alert)`
  border-radius: 0;
  margin: 0 0 1rem 0;
`

export const OfflineBanner = () => {
  const [isOffline, setIsOffline] = useState(() => !navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (!isOffline) return null

  return (
    <StyledBanner
      type="warning"
      showIcon
      message="Нет соединения с интернетом"
      description="Часть приложения доступна офлайн. Проверьте подключение — после восстановления связи обновите страницу, чтобы подгрузить актуальные данные."
    />
  )
}
