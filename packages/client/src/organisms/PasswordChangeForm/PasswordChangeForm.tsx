import type { FormProps } from 'antd'
import { Button, Form, Input } from 'antd'
import styles from './PasswordChangeForm.module.css'

type PasswordChangeFormValues = {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

type PasswordChangeFormProps = {
  onFinish: FormProps<PasswordChangeFormValues>['onFinish']
  onFinishFailed: FormProps<PasswordChangeFormValues>['onFinishFailed']
  onCancel?: () => void
}

export const PasswordChangeForm = ({
  onFinish,
  onFinishFailed,
  onCancel,
}: PasswordChangeFormProps) => {
  const [form] = Form.useForm<PasswordChangeFormValues>()

  return (
    <Form
      form={form}
      name="password-change"
      layout="vertical"
      className={styles.form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off">
      <Form.Item<PasswordChangeFormValues>
        label="Старый пароль"
        name="oldPassword"
        rules={[
          {
            required: true,
            message: 'Старый пароль обязателен для заполнения',
          },
        ]}>
        <Input.Password />
      </Form.Item>

      <Form.Item<PasswordChangeFormValues>
        label="Новый пароль"
        name="newPassword"
        rules={[
          { required: true, message: 'Новый пароль обязателен для заполнения' },
          { min: 8, message: 'Пароль должен быть минимум 8 символов' },
          { max: 40, message: 'Пароль должен быть максимум 40 символов' },
          {
            pattern: /^(?=.*[A-Z])(?=.*\d).+$/,
            message:
              'Пароль должен содержать хотя бы одну заглавную букву и цифру',
          },
        ]}>
        <Input.Password />
      </Form.Item>

      <Form.Item<PasswordChangeFormValues>
        label="Повторите пароль"
        name="confirmPassword"
        dependencies={['newPassword']}
        rules={[
          {
            required: true,
            message: 'Повторите новый пароль',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('Пароли не совпадают'))
            },
          }),
        ]}>
        <Input.Password />
      </Form.Item>

      <div className={styles.buttonWrapper}>
        {onCancel && (
          <Button onClick={onCancel} style={{ marginRight: 8 }}>
            Отмена
          </Button>
        )}
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </div>
    </Form>
  )
}
