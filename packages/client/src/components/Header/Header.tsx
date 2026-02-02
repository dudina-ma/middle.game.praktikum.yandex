import { Link } from 'react-router-dom'
import styles from './Header.module.css'
const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.navList}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/">Main</Link>
          </li>
          <li className={styles.item}>
            <Link to="/login">Login</Link>
          </li>
          <li className={styles.item}>
            <Link to="/sign-in">SignIn</Link>
          </li>
          <li className={styles.item}>
            <Link to="/profile">Profile</Link>
          </li>
          <li className={styles.item}>
            <Link to="/game">Game</Link>
          </li>
          <li className={styles.item}>
            <Link to="/leaderboard">Leaderboard</Link>
          </li>
          <li className={styles.item}>
            <Link to="/forum">Forum</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
export default Header
