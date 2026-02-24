import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'
import {
  toggleFullscreen as toggleFs,
  getFullscreenElement,
} from '../../utils/fullscreen'
import styles from './style.module.css'

const Header = () => {
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!getFullscreenElement())
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    document.addEventListener('mozfullscreenchange', handleFullscreenChange)
    document.addEventListener('MSFullscreenChange', handleFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener(
        'webkitfullscreenchange',
        handleFullscreenChange
      )
      document.removeEventListener(
        'mozfullscreenchange',
        handleFullscreenChange
      )
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange)
    }
  }, [])

  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.list}>
          <li>
            <Link to="/" className={styles.link}>
              Main
            </Link>
          </li>
          <li>
            <Link to="/login" className={styles.link}>
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className={styles.link}>
              SignIn
            </Link>
          </li>
          <li>
            <Link to="/profile" className={styles.link}>
              Profile
            </Link>
          </li>
          <li>
            <Link to="/game" className={styles.link}>
              Game
            </Link>
          </li>
          <li>
            <Link to="/leaderboard" className={styles.link}>
              Leaderboard
            </Link>
          </li>
          <li>
            <Link to="/forum" className={styles.link}>
              Forum
            </Link>
          </li>
        </ul>
      </nav>
      <Button
        type="primary"
        size="large"
        className={styles.fullscreenButton}
        icon={
          isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />
        }
        onClick={toggleFs}>
        {isFullscreen ? 'Свернуть' : 'На весь экран'}
      </Button>
    </header>
import { useNavigate } from 'react-router-dom'
import { RoutesEnum } from '../../paths'
import { Menu } from 'antd'
import { useCallback } from 'react'
import { MenuItemType } from 'antd/es/menu/interface'
import { MenuInfo } from '@rc-component/menu/lib/interface'

const links: Record<string, RoutesEnum> = {
  Главная: RoutesEnum.Main,
  Игра: RoutesEnum.Game,
  Форум: RoutesEnum.Forum,
  'Таблица лидеров': RoutesEnum.Leaderboard,
  Профиль: RoutesEnum.Profile,
}

const menu: MenuItemType[] = Object.entries(links).map(([name, path]) => ({
  key: path,
  label: name,
}))

const Header = () => {
  const navigate = useNavigate()

  const onClick = useCallback(
    (item: MenuInfo) => {
      if (Object.values(links).includes(item.key as RoutesEnum))
        navigate(item.key)
    },
    [navigate]
  )

  return <Menu mode={'horizontal'} onClick={onClick} items={menu} />
}

export default Header
