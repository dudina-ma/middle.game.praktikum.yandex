import { Link } from 'react-router-dom'
import { RoutesEnum } from '../../paths'
import React from 'react'
import { FullscreenButton } from '../../atoms/FullscreenButton/FullscreenButton'
import styled from 'styled-components'
import { Typography } from 'antd'

const links: Record<string, RoutesEnum> = {
  Главная: RoutesEnum.Main,
  Игра: RoutesEnum.Game,
  Форум: RoutesEnum.Forum,
  'Таблица лидеров': RoutesEnum.Leaderboard,
  Профиль: RoutesEnum.Profile,
}

const HeaderContainer = styled.header`
  width: 70%;
  padding: 16px;
  margin: 0 auto;
  gap: 16px;
  display: flex;
  justify-content: space-between;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`

const Navigation = styled.nav`
  display: flex;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.2);
  }
`

const Header = () => {
  return (
    <HeaderContainer>
      <Navigation>
        {Object.entries(links).map(([key, value]) => (
          <StyledLink key={key} to={value}>
            <Typography.Text>{key}</Typography.Text>
          </StyledLink>
        ))}
      </Navigation>
      <FullscreenButton />
    </HeaderContainer>
  )
}

export default Header
