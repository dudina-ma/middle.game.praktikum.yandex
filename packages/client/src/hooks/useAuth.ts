import { useGetUserQuery } from '../api/auth'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export const useAuth = () => {
  const { data: user, isError } = useGetUserQuery(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) navigate('/login')
  }, [isError])

  return user
}
