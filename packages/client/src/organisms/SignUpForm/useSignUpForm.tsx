import { useNavigate } from 'react-router-dom'
import { useSignUpMutation } from '../../api/authApi'
import { FormProps, message } from 'antd'
import { SignUpRequest } from '../../api/auth.schema'
import { getErrorMessage } from '../../utils/errorUtils'

export const useSignUpForm = () => {
  const navigate = useNavigate()
  const [signUp, { isLoading }] = useSignUpMutation()

  const onFinish: FormProps<SignUpRequest>['onFinish'] = async values => {
    try {
      await signUp(values).unwrap()
      message.success('Регистрация выполнена успешно!')
      navigate('/')
    } catch (error) {
      // Error handler
      console.error(error)
      message.error(getErrorMessage(error))
    }
  }

  return { onFinish, isLoading }
}
