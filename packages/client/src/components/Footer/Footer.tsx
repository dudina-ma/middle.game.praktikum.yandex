import styled from 'styled-components'

const StyledFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: cornsilk;
  padding: 1rem;
`

const Footer = () => {
  return <StyledFooter>{'Nanosoft'}</StyledFooter>
}

export default Footer
