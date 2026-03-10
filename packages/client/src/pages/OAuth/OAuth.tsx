import { Spin } from 'antd'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  REDIRECT_URI as redirect_uri,
  useSignInYandexMutation,
} from '../../api/oauthYandex'

export const OAuth = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const code = searchParams.get('code')
  const [signInYandex, { isLoading, isError }] = useSignInYandexMutation()
  if (isError) {
    navigate('/login')
  }

  useEffect(() => {
    if (code) {
      signInYandex({ code, redirect_uri })
    }
  }, [])

  return isLoading ? <Spin size="large" /> : <></>
}
