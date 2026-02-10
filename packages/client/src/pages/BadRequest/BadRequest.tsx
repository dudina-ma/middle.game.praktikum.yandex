import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'
import styles from './BadRequest.module.css'

const BadRequest = () => {
  return (
    <section className={styles.root}>
      <Result
        status="error"
        title="400"
        subTitle="Некорректный запрос. Проверьте введенные данные и попробуйте снова."
        extra={
          <Link to="/">
            <Button type="primary">На главную</Button>
          </Link>
        }
      />
    </section>
  )
}

export default BadRequest
