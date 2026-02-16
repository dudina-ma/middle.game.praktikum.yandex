import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { RoutesEnum } from '../../routes'

const StyledHeader = styled.header`
  background-color: cornsilk;
  display: flex;
  justify-content: center;
  align-items: center;
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
          {Object.entries(RoutesEnum).map(([name, path]) => (
            <ListItem key={name}>
              <StyledLink to={path}>{name}</StyledLink>
            </ListItem>
          ))}
        </List>
      </NavList>
    </StyledHeader>
  )
}

export default Header
