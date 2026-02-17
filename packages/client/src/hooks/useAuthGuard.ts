import { useGetUserQuery } from '../api/auth'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { isFetchBaseQueryError } from '../shared/redux/typeGuards'
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

export const useAuthGuard = () => {
  const { data: user, error, isLoading } = useGetUserQuery()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoading) {
      return
    }

    if (error) {
      navigate(isUnauthorized(error) ? RoutesEnum.SignIn : RoutesEnum.Error500)
    }
  }, [navigate, error, isLoading])

  return user
}
