import { Button, Form, Input, Typography } from 'antd'
import { useSignUpForm } from './useSignUpForm'

const { Link } = Typography

export const SignUpForm = () => {
  const { isLoading, onFinish } = useSignUpForm()

  return (
    <Form
      name="register"
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off">
      <Form.Item name="first_name">
        <Input placeholder="Имя" />
      </Form.Item>

      <Form.Item name="second_name">
        <Input placeholder="Фамилия" />
      </Form.Item>

      <Form.Item name="login">
        <Input placeholder="Логин" />
      </Form.Item>

      <Form.Item name="email">
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item name="password">
        <Input.Password placeholder="Пароль" />
      </Form.Item>

      <Form.Item name="phone">
        <Input placeholder="Телефон" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading} block>
          Зарегистрироваться
        </Button>
      </Form.Item>

      <Form.Item style={{ textAlign: 'center' }}>
        <Link href="/login">Есть аккаунта?</Link>
      </Form.Item>
    </Form>
  )
}
