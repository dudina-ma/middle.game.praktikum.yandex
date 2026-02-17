import { Button, Form, Input, Typography } from 'antd'
import { useSignUpForm } from './useSignUpForm'
import {
  emailRules,
  firstNameRules,
  loginRules,
  passwordRules,
  phoneRules,
  secondNameRules,
} from '../../shared/validation/rules'
import { RoutesEnum } from '../../paths'

const { Link } = Typography

export const SignUpForm = () => {
  const { isLoading, onFinish } = useSignUpForm()

  return (
    <Form
      name="register"
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off">
      <Form.Item name="first_name" rules={firstNameRules}>
        <Input placeholder="Имя" />
      </Form.Item>

      <Form.Item name="second_name" rules={secondNameRules}>
        <Input placeholder="Фамилия" />
      </Form.Item>

      <Form.Item name="login" rules={loginRules}>
        <Input placeholder="Логин" />
      </Form.Item>

      <Form.Item name="email" rules={emailRules}>
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item name="password" rules={passwordRules}>
        <Input.Password placeholder="Пароль" />
      </Form.Item>

      <Form.Item name="phone" rules={phoneRules}>
        <Input placeholder="Телефон" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading} block>
          Зарегистрироваться
        </Button>
      </Form.Item>

      <Form.Item style={{ textAlign: 'center' }}>
        <Link href={RoutesEnum.SignIn}>Есть аккаунт?</Link>
      </Form.Item>
    </Form>
  )
}
