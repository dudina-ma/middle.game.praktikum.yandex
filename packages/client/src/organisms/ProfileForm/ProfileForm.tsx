import { memo } from 'react'
import type { FormProps } from 'antd'
import { Button, Form, Input } from 'antd'
import { User } from '../../slices/userSlice'
import styles from './ProfileForm.module.css'

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
        <Form.Item<User>
          label="Имя"
          name="first_name"
          rules={[
            { required: true, message: 'Имя обязательно для заполнения' },
            {
              pattern: /^[А-ЯЁA-Z][а-яёa-z]*(?:-[а-яёa-z]+)*$/,
              message:
                'Имя должно начинаться с заглавной буквы, содержать только буквы и дефис (не в начале/конце)',
            },
          ]}>
          <Input readOnly={isReadOnly} />
        </Form.Item>

        <Form.Item<User>
          label="Фамилия"
          name="second_name"
          rules={[
            { required: true, message: 'Фамилия обязательна для заполнения' },
            {
              pattern: /^[А-ЯЁA-Z][а-яёa-z]*(?:-[а-яёa-z]+)*$/,
              message:
                'Фамилия должна начинаться с заглавной буквы, содержать только буквы и дефис (не в начале/конце)',
            },
          ]}>
          <Input readOnly={isReadOnly} />
        </Form.Item>

        <Form.Item<User>
          label="Никнейм"
          name="display_name"
          rules={[
            { required: true, message: 'Никнейм обязателен для заполнения' },
            { min: 3, message: 'Никнейм должен быть минимум 3 символа' },
            { max: 20, message: 'Никнейм должен быть максимум 20 символов' },
            {
              pattern: /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]+$/,
              message:
                'Никнейм может содержать только латинские буквы, цифры, дефис и подчёркивание, и должен содержать хотя бы одну букву',
            },
          ]}>
          <Input readOnly={isReadOnly} />
        </Form.Item>

        <Form.Item<User>
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Email обязателен для заполнения' },
            {
              pattern: /^[a-zA-Z0-9-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+(\.[a-zA-Z]+)*$/,
              message:
                'Email должен быть в формате example@mail.com, после точки должны быть латинские буквы',
            },
          ]}>
          <Input readOnly={isReadOnly} />
        </Form.Item>

        <Form.Item<User>
          label="Телефон"
          name="phone"
          normalize={value => value?.replace(/[^\d+]/g, '')}
          rules={[
            {
              validator: (_: unknown, value: string) => {
                if (!value) {
                  return Promise.reject(
                    new Error('Телефон обязателен для заполнения')
                  )
                }
                const normalized = value.replace(/[^\d+]/g, '')
                const phoneRegex = /^\+?\d{10,15}$/
                if (!phoneRegex.test(normalized)) {
                  return Promise.reject(
                    new Error(
                      'Телефон должен быть от 10 до 15 цифр и может начинаться с +'
                    )
                  )
                }
                return Promise.resolve()
              },
            },
          ]}>
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
