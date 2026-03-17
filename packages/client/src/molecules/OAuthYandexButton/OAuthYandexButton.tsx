import { Button } from 'antd'
import { GET_YANDEX_AUTH_URL } from '../../api/consts'
import { useGetServiceIdQuery } from '../../api/oauthYandex'

export const OAuthYandexButton = () => {
  const { data, isLoading } = useGetServiceIdQuery()

  const onClickHandler = () => {
    if (data?.service_id) {
      window.location.href = GET_YANDEX_AUTH_URL(data.service_id)
    }
  }

  return (
    <Button disabled={isLoading} loading={isLoading} onClick={onClickHandler}>
      Авторизация через Yandex ID
    </Button>
  )
}
