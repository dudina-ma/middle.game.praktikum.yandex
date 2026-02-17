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
