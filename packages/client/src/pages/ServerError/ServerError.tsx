import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'
import styles from './ServerError.module.css'

const ServerError = () => {
  return (
    <section className={styles.root}>
      <Result
        status="error"
        title="500"
        subTitle="На сервере произошла ошибка. Попробуйте обновить страницу чуть позже."
        extra={
          <Link to="/">
            <Button type="primary">На главную</Button>
          </Link>
        }
      />
    </section>
  )
}

export default ServerError
