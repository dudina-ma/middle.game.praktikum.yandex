import { useRouteError } from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary'

export const RouterErrorAdapter = () => {
  const error = useRouteError()

  const errorInstance =
    error instanceof Error ? error : new Error(String(error))

  return <ErrorBoundary error={errorInstance} />
}
