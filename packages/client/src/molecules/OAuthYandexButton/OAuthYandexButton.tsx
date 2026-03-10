import { Button } from 'antd'
import { REDIRECT_URI, useGetServiceIdQuery } from '../../api/oauthYandex'
// import { useEffect } from "react"

export const OAuthYandexButton = () => {
  const { data, isLoading } = useGetServiceIdQuery()

  const onClickHandler = () => {
    if (data?.service_id) {
      window.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${data?.service_id}&redirect_uri=${REDIRECT_URI}`
    }
  }

  return (
    <Button disabled={isLoading} loading={isLoading} onClick={onClickHandler}>
      Авторизация через Yandex
    </Button>
  )
}
