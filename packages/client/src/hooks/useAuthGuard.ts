import { useGetUserQuery } from '../api/authApi'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import {
  isFetchBaseQueryError,
  isFetchError,
  isTimeoutError,
} from '../shared/redux/typeGuards'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { SerializedError } from '@reduxjs/toolkit'

export const isUnauthorized = (
  error: FetchBaseQueryError | SerializedError | undefined
) => {
  return isFetchBaseQueryError(error)
    ? [401, 403].includes(Number(error.status))
    : false
}

const isNetworkError = (error: FetchBaseQueryError | SerializedError) => {
  return (
    isFetchBaseQueryError(error) &&
    (isFetchError(error) || isTimeoutError(error))
  )
}

export const useAuthGuard = () => {
  const { data: user, error, isLoading } = useGetUserQuery()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoading) {
      return
    }

    if (error) {
      if (isUnauthorized(error)) {
        navigate('/login')
      } else if (isNetworkError(error) || !navigator.onLine) {
        return
      } else {
        navigate('/error-500')
      }
    }
  }, [navigate, error, isLoading])

  return user
}
