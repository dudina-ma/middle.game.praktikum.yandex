import { useGetUserQuery } from '../api/authApi'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { isFetchBaseQueryError, isFetchError } from '../shared/redux/typeGuards'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { SerializedError } from '@reduxjs/toolkit'
import { RoutesEnum } from '../paths'

export const isUnauthorized = (
  error: FetchBaseQueryError | SerializedError | undefined
) => {
  return isFetchBaseQueryError(error)
    ? [401, 403].includes(Number(error.status))
    : false
}

const isNetworkError = (error: FetchBaseQueryError | SerializedError) => {
  return isFetchBaseQueryError(error) && isFetchError(error)
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
        navigate(RoutesEnum.SignIn)
      } else if (isNetworkError(error) || !navigator.onLine) {
        return
      } else {
        navigate(RoutesEnum.ServerError)
      }
    }
  }, [navigate, error, isLoading])

  return user
}
