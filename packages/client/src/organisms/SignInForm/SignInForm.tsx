import { Button, Form, Input, Typography } from 'antd'
import { SignInRequest } from '../../api/auth.schema'
import { useSignInForm } from './useSignInForm'
import { loginRules, passwordRules } from '../../shared/validation/rules'

const { Link } = Typography

export const SignInForm = () => {
  const { isLoading, onFinish } = useSignInForm()

  return (
    <Form<SignInRequest> name="signin" onFinish={onFinish} autoComplete="off">
      <Form.Item name="login" rules={loginRules}>
        <Input placeholder="Логин" allowClear />
      </Form.Item>

      <Form.Item name="password" rules={passwordRules}>
        <Input.Password placeholder="Пароль" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading} block>
          Войти
        </Button>
      </Form.Item>

      <Form.Item style={{ textAlign: 'center' }}>
        <Link href="/register">Нет аккаунта?</Link>
      </Form.Item>
    </Form>
  )
}
