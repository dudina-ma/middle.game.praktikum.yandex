import { useNavigate } from 'react-router-dom'
import { useSignInMutation } from '../../api/authApi'
import { FormProps, message } from 'antd'
import { SignInRequest } from '../../api/auth.schema'
import { getErrorMessage } from '../../utils/errorUtils'
import {
  isFetchBaseQueryError,
  isHttpError,
} from '../../shared/redux/typeGuards'

export const useSignInForm = () => {
  const navigate = useNavigate()
  const [signIn, { isLoading }] = useSignInMutation()

  const onFinish: FormProps<SignInRequest>['onFinish'] = async values => {
    try {
      await signIn(values).unwrap()
      message.success('Вход выполнен успешно!')
      navigate('/')
    } catch (error) {
      // Error handler
      if (isFetchBaseQueryError(error) && isHttpError(error)) {
        navigate('/')
        return
      }

      message.error(getErrorMessage(error))
    }
  }

  return { onFinish, isLoading }
}
