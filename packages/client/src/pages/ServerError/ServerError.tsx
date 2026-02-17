import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import styles from './ServerError.module.css'

const ServerError = () => {
  const navigate = useNavigate()
  return (
    <section className={styles.root}>
      <Result
        status="error"
        title="500"
        subTitle="На сервере произошла ошибка. Попробуйте обновить страницу чуть позже."
        extra={
          <Button type="primary" onClick={() => navigate('/')}>
            На главную
          </Button>
        }
      />
    </section>
  )
}

export default ServerError
