import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import styled from 'styled-components'

import { useAuth } from '../../hooks/useAuth'

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const MainContent = styled.main`
  flex: 1 0 auto;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`

const Layout: React.FC = () => {
  useAuth()
  return (
    <LayoutContainer>
      <Header />
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
    </LayoutContainer>
  )
}

export default Layout
