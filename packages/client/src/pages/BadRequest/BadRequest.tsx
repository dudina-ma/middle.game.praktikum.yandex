import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import styles from './BadRequest.module.css'

const BadRequest = () => {
  const navigate = useNavigate()
  return (
    <section className={styles.root}>
      <Result
        status="error"
        title="400"
        subTitle="Некорректный запрос. Проверьте введенные данные и попробуйте снова."
        extra={
          <Button type="primary" onClick={() => navigate('/')}>
            На главную
          </Button>
        }
      />
    </section>
  )
}

export default BadRequest
