import { memo } from 'react'
import type { FormProps } from 'antd'
import { Button, Form, Input } from 'antd'
import { User } from '../../slices/userSlice'
import styles from './ProfileForm.module.css'
import {
  displayNameRules,
  emailRules,
  firstNameRules,
  phoneRules,
  secondNameRules,
} from '../../shared/validation/rules'

type ProfileFormProps = {
  user: User
  isReadOnly: boolean
  onFinish: FormProps<User>['onFinish']
  onFinishFailed: FormProps<User>['onFinishFailed']
  onCancel?: () => void
  isLoading?: boolean
}

export const ProfileForm = memo(
  ({
    user,
    isReadOnly,
    onFinish,
    onFinishFailed,
    onCancel,
    isLoading = false,
  }: ProfileFormProps) => {
    return (
      <Form
        name="profile-page"
        layout="vertical"
        className={styles.form}
        initialValues={user}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <Form.Item<User> label="Имя" name="first_name" rules={firstNameRules}>
          <Input readOnly={isReadOnly} />
        </Form.Item>

        <Form.Item<User>
          label="Фамилия"
          name="second_name"
          rules={secondNameRules}>
          <Input readOnly={isReadOnly} />
        </Form.Item>

        <Form.Item<User>
          label="Никнейм"
          name="display_name"
          rules={displayNameRules}>
          <Input readOnly={isReadOnly} />
        </Form.Item>

        <Form.Item<User> label="Email" name="email" rules={emailRules}>
          <Input readOnly={isReadOnly} />
        </Form.Item>

        <Form.Item<User>
          label="Телефон"
          name="phone"
          normalize={value => value?.replace(/[^\d+]/g, '')}
          rules={phoneRules}>
          <Input readOnly={isReadOnly} />
        </Form.Item>

        {!isReadOnly && (
          <Form.Item>
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
          </Form.Item>
        )}
      </Form>
    )
  }
)
