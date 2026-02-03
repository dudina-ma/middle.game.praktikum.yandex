import { FC } from 'react'
import type { FormProps } from 'antd'
import { Button, Form, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'

type FieldType = {
  username?: string
  password?: string
}

const onFinish: FormProps<FieldType>['onFinish'] = values => {
  console.log('Success:', values)
}

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
  console.log('Failed:', errorInfo)
}

export const SignIn: FC = () => {
  return (
    <Form
      name="login"
      style={{ maxWidth: 360 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}>
      <Form.Item<FieldType>
        name="username"
        rules={[
          {
            required: true,
            message: "'Пожалуйста, введите ваш логин!",
          },
        ]}>
        <Input prefix={<UserOutlined />} placeholder="Пользователь" />
      </Form.Item>
      <Form.Item<FieldType>
        name="password"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите ваш пароль!',
          },
        ]}>
        <Input prefix={<LockOutlined />} type="password" placeholder="Пароль" />
      </Form.Item>
      <Form.Item>
        <Button block type="primary" htmlType="submit">
          Войти
        </Button>
      </Form.Item>
    </Form>
  )
}
