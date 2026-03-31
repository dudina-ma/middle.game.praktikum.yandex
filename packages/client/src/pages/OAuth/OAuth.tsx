import { message, Spin } from 'antd'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { REDIRECT_URI as redirect_uri } from '../../api/consts'
import { useSignInYandexMutation } from '../../api/oauthYandex'
import { AuthPageContainer } from '../../atoms'
import { RoutesEnum } from '../../paths'

export const OAuth = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const code = searchParams.get('code')

  const [signInYandex] = useSignInYandexMutation()

  const errorHandler = () => {
    message.error('Ошибка авторизации')
    navigate(RoutesEnum.SignIn)
  }

  useEffect(() => {
    if (code) {
      signInYandex({ code, redirect_uri })
        .unwrap()
        .then(() => {
          navigate(RoutesEnum.Main)
          message.success('Авторизация прошла успешно')
        })
        .catch(() => {
          errorHandler()
        })
    } else {
      errorHandler()
    }
  }, [])

  return (
    <AuthPageContainer>
      <Spin size="large"></Spin>
    </AuthPageContainer>
  )
}
