import { memo } from 'react'
import type { FormProps } from 'antd'
import { Button, Form, Input } from 'antd'
import styles from './PasswordChangeForm.module.css'
import {
  confirmPasswordRules,
  newPasswordRules,
  oldPasswordRules,
} from '../../shared/validation/rules'

type PasswordChangeFormValues = {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

type PasswordChangeFormProps = {
  onFinish: FormProps<PasswordChangeFormValues>['onFinish']
  onFinishFailed: FormProps<PasswordChangeFormValues>['onFinishFailed']
  onCancel?: () => void
  isLoading?: boolean
}

export const PasswordChangeForm = memo(
  ({
    onFinish,
    onFinishFailed,
    onCancel,
    isLoading = false,
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
          rules={oldPasswordRules}>
          <Input.Password />
        </Form.Item>

        <Form.Item<PasswordChangeFormValues>
          label="Новый пароль"
          name="newPassword"
          dependencies={['oldPassword']}
          rules={newPasswordRules}>
          <Input.Password />
        </Form.Item>

        <Form.Item<PasswordChangeFormValues>
          label="Повторите пароль"
          name="confirmPassword"
          dependencies={['newPassword']}
          rules={confirmPasswordRules}>
          <Input.Password />
        </Form.Item>

        <div className={styles.buttonWrapper}>
          {onCancel && (
            <Button onClick={onCancel} style={{ marginRight: 8 }}>
              Отмена
            </Button>
          )}
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Сохранить
          </Button>
        </div>
      </Form>
    )
  }
)
