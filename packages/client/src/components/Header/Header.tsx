import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledHeader = styled.header`
  background-color: cornsilk;
  display: flex;
  justify-content: center;
  height: 3rem;
`

const NavList = styled.nav``

const List = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0;
  margin: 0;
`

const ListItem = styled.li`
  /* Можно добавить дополнительные стили для элементов списка */
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
    <StyledHeader>
      <NavList>
        <List>
          <ListItem>
            <StyledLink to="/">Main</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/login">Login</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/sign-in">SignIn</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/profile">Profile</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/game">Game</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/leaderboard">Leaderboard</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/forum">Forum</StyledLink>
          </ListItem>
        </List>
      </NavList>
    </StyledHeader>
  )
}

export default Header
