import { Component, ErrorInfo, ReactNode } from 'react'
import { Result, Button } from 'antd'
import styles from './style.module.css'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <Result
          status="error"
          title="Что-то пошло не так"
          subTitle="Произошла непредвиденная ошибка. Пожалуйста, попробуйте перезагрузить страницу."
          extra={[
            <Button type="primary" key="reload" onClick={this.handleReload}>
              Перезагрузить страницу
            </Button>,
            <Button key="reset" onClick={this.handleReset}>
              Попробовать снова
            </Button>,
          ]}>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <div className={styles.errorDetails}>
              <strong className={styles.errorTitle}>
                Ошибка (только в режиме разработки):
              </strong>
              <pre className={styles.errorPre}>
                {this.state.error.toString()}
              </pre>
            </div>
          )}
        </Result>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
