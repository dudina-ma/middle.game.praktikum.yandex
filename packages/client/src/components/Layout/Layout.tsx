// components/Layout/Layout.tsx
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import styles from './Layout.module.css'

const Layout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.mainContent}>
        <Outlet /> {/* Здесь будут отображаться страницы */}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
