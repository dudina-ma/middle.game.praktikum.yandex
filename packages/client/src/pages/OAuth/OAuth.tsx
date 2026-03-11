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

  useEffect(() => {
    if (code) {
      signInYandex({ code, redirect_uri })
        .unwrap()
        .then(() => {
          navigate(RoutesEnum.Main)
          message.success('Авторизация прошла успешно')
        })
        .catch(() => {
          message.error('Ошибка авторизации')
          navigate(RoutesEnum.SignIn)
        })
    } else {
      navigate(RoutesEnum.Main)
    }
  }, [code, navigate, signInYandex])

  return (
    <AuthPageContainer>
      <Spin size="large"></Spin>
    </AuthPageContainer>
  )
}
